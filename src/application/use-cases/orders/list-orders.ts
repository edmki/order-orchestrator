import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/entities/order';
import { OrderStatus } from 'src/domain/enums/order-status';
import { OrderRepository } from 'src/domain/repositories/order-repository';

@Injectable()
export class ListOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(status?: OrderStatus): Promise<Order[]> {
    const orders = await this.orderRepository.list(status);
    return orders;
  }
}
