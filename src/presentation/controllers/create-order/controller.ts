import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrder } from 'src/application/use-cases/create-order';
import { CreateOrderRequest } from './request';

@Controller('orders')
export class CreateOrderController {
  constructor(private readonly createOrder: CreateOrder) {}

  @Post()
  async handle(@Body() data: CreateOrderRequest): Promise<void> {
    await this.createOrder.execute({
      orderId: data.order_id,
      idempotencyKey: data.idempotency_key,
      customer: data.customer,
      items: data.items.map((item) => ({
        sku: item.sku,
        qty: item.qty,
        unitPrice: item.unit_price,
      })),
      currency: data.currency,
    });
  }
}
