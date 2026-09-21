import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/domain/repositories/order-repository';
import { QueueService } from 'src/infra/queue/queue.service';

@Injectable()
export class HandleOrderEnrichmentFailure {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly queueService: QueueService,
  ) {}

  async execute(orderId: string): Promise<void> {
    await this.orderRepository.markEnrichmentAsFailed(orderId);

    await this.queueService.addToDeadLetterQueue(orderId);
  }
}
