# Order Orchestrator

API de orquestração de pedidos construída com **NestJS**, seguindo **Clean Architecture**. Recebe pedidos via webhook, valida e garante idempotência, enfileira para processamento assíncrono, enriquece os dados consultando uma API externa de câmbio, e trata falhas com retry + backoff exponencial e Dead Letter Queue (DLQ).

Desafio técnico desenvolvido para processo seletivo de backend pleno.

---

## Stack

- **NestJS** + TypeScript
- **PostgreSQL** + TypeORM (persistência)
- **Redis** + BullMQ (filas, retry e DLQ)
- **Axios** + [Frankfurter API](https://frankfurter.dev/) (enriquecimento — conversão de câmbio)
- **class-validator** / **class-transformer** (validação de payload)
- **Swagger** (documentação da API)

---

## Arquitetura

O projeto segue Clean Architecture, dividido em quatro camadas com dependências apontando sempre para dentro (infra e presentation dependem de application e domain; domain não depende de nada):

```
src/
├── domain/          # Entidades, enums e contratos (interfaces/abstract classes).
│                     Sem dependência de framework.
├── application/      # Use cases — um por ação de negócio (CreateOrder, ProcessOrder,
│                     HandleOrderEnrichmentFailure, ListOrders, GetOrderById, GetQueueMetrics)
├── infra/            # Implementações concretas: repositório PostgreSQL/TypeORM,
│                     fila BullMQ/Redis, integração HTTP com o serviço de câmbio
└── presentation/      # Controllers HTTP, DTOs de request/response, Swagger
```

`OrderRepository` e `ExchangeRateService` são definidos como classes abstratas no `domain` e implementados na `infra` (`PostgreSqlOrderRepository` e `AxiosExchangeRateService`), seguindo inversão de dependência — o domínio nunca conhece TypeORM ou Axios diretamente.

---

## Como rodar

**Pré-requisitos:** Node.js 20+, Docker e Docker Compose.

```bash
# 1. Clonar o repositório
git clone https://github.com/edmki/order-orchestrator.git
cd order-orchestrator

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Subir PostgreSQL e Redis
docker-compose up -d

# 4. Instalar dependências
npm install

# 5. Rodar as migrations
npm run migration:run

# 6. Subir a aplicação
npm run start:dev
```

A API sobe em `http://localhost:3001` (porta configurável via `PORT`).
Documentação interativa (Swagger) em `http://localhost:3001/api-docs`.

### Variáveis de ambiente

| Variável                        | Descrição                                         | Padrão                           |
| ------------------------------- | ------------------------------------------------- | -------------------------------- |
| `DATABASE_URL`                  | Connection string do PostgreSQL                   | —                                |
| `PORT`                          | Porta da aplicação                                | `3001`                           |
| `REDIS_HOST`                    | Host do Redis                                     | —                                |
| `REDIS_PORT`                    | Porta do Redis                                    | `6379`                           |
| `QUEUE_RETRY_ATTEMPTS`          | Nº de tentativas antes de enviar o job à DLQ      | `3`                              |
| `QUEUE_RETRY_DELAY`             | Delay inicial (ms) do backoff exponencial         | `5000`                           |
| `EXCHANGE_RATE_API_URL`         | URL base da API de câmbio usada no enriquecimento | `https://api.frankfurter.dev/v1` |
| `TARGET_EXCHANGE_RATE_CURRENCY` | Moeda alvo da conversão                           | `BRL`                            |

---

## Endpoints

| Método | Rota               | Descrição                                      |
| ------ | ------------------ | ---------------------------------------------- |
| POST   | `/webhooks/orders` | Recebe um pedido, valida, persiste e enfileira |
| GET    | `/orders`          | Lista pedidos, com filtro opcional `?status=`  |
| GET    | `/orders/:id`      | Detalhes de um pedido pelo `id` interno (uuid) |
| GET    | `/queue/metrics`   | Métricas das filas `orders` e `orders-dlq`     |

### Exemplo de payload (`POST /webhooks/orders`)

```json
{
  "order_id": "ext-123",
  "customer": { "email": "user@example.com", "name": "Ana" },
  "items": [{ "sku": "ABC123", "qty": 2, "unit_price": 59.9 }],
  "currency": "USD",
  "idempotency_key": "uuid-or-hash"
}
```

---

## Fluxo de processamento

1. **Recebimento**: o payload é validado com `class-validator` (`ValidationPipe` global com `whitelist` + `forbidNonWhitelisted`).
2. **Idempotência**: `idempotency_key` tem índice único no banco. Uma inserção com chave repetida usa `ON CONFLICT DO NOTHING` e é silenciosamente ignorada — o pedido não é duplicado nem reenfileirado.
3. **Persistência**: pedido salvo com status `RECEIVED` e enfileirado na fila `orders` (BullMQ/Redis).
4. **Enriquecimento**: o `OrderProcessor` consome o job, atualiza o status para `PROCESSING` e consulta a API de câmbio para converter o total do pedido para a moeda alvo.
5. **Sucesso**: status atualizado para `COMPLETED`, com os dados de câmbio salvos em `enrichmentData`.
6. **Falha**: o BullMQ reexecuta o job automaticamente com backoff exponencial (`QUEUE_RETRY_ATTEMPTS` tentativas, `QUEUE_RETRY_DELAY` de delay inicial). Ao esgotar as tentativas, o job é publicado na fila `orders-dlq` e o pedido tem o status atualizado para `FAILED_ENRICHMENT`.
