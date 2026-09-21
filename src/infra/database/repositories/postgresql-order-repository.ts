import { Order } from 'src/domain/entities/order';
import { OrderRepository } from 'src/domain/repositories/order-repository';
import { OrderSchema } from '../schemas/order.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/domain/enums/order-status';

@Injectable()
export class PostgreSqlOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderSchema)
    private readonly orderRepository: Repository<OrderSchema>,
  ) {}

  async create(order: Order): Promise<Order | null> {
    const result = await this.orderRepository
      .createQueryBuilder()
      .insert()
      .into(OrderSchema)
      .values(order)
      .orIgnore()
      .returning('*')
      .execute();

    const createdOrder = (result.raw as Order[])[0];

    return createdOrder ?? null;
  }

  async list(status?: OrderStatus): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: status ? { status } : {},
    });
    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    return order ?? null;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    await this.orderRepository.update({ id }, { status });
  }

  async complete(
    id: string,
    enrichmentData: Record<string, any>,
  ): Promise<void> {
    await this.orderRepository.update(
      { id },
      {
        status: OrderStatus.COMPLETED,
        enrichmentData,
      },
    );
  }

  async markEnrichmentAsFailed(id: string): Promise<void> {
    await this.orderRepository.update(
      { id },
      {
        status: OrderStatus.FAILED_ENRICHMENT,
      },
    );
  }
}
