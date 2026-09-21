import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/entities/order';
import { OrderRepository } from 'src/domain/repositories/order-repository';

@Injectable()
export class GetOrderById {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order | null> {
    return await this.orderRepository.findById(orderId);
  }
}
