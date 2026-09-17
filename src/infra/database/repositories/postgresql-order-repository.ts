import { Order } from 'src/domain/entities/order';
import { OrderRepository } from 'src/domain/repositories/order-repository';
import { OrderSchema } from '../schemas/order.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgreSqlOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderSchema)
    private readonly orderRepository: Repository<OrderSchema>,
  ) {}

  async create(order: Order): Promise<void> {
    const orderSchema = this.orderRepository.create(order);
    await this.orderRepository.save(orderSchema);
  }
}
