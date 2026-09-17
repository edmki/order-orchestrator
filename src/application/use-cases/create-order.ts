import { Injectable } from '@nestjs/common';
import { OrderCustomer, OrderItem } from 'src/domain/entities/order';
import { OrderStatus } from 'src/domain/enums/order-status';
import { OrderRepository } from 'src/domain/repositories/order-repository';
import { v4 as uuid } from 'uuid';

export interface CreateOrderParams {
  orderId: string;
  idempotencyKey: string;
  customer: OrderCustomer;
  items: OrderItem[];
  currency: string;
}

@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(order: CreateOrderParams): Promise<void> {
    await this.orderRepository.create({
      id: uuid(),
      orderId: order.orderId,
      idempotencyKey: order.idempotencyKey,
      customer: order.customer,
      items: order.items,
      currency: order.currency,
      status: OrderStatus.RECEIVED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
