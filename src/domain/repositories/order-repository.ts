import { Order } from '../entities/order';
import { OrderStatus } from '../enums/order-status';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order | null>;
  abstract list(status?: OrderStatus): Promise<Order[]>;
  abstract findById(id: string): Promise<Order | null>;
  abstract updateStatus(id: string, status: OrderStatus): Promise<void>;
  abstract complete(
    id: string,
    enrichmentData: Record<string, any>,
  ): Promise<void>;
  abstract markEnrichmentAsFailed(id: string): Promise<void>;
}
