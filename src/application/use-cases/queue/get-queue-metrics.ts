import { Injectable } from '@nestjs/common';
import { QueueService } from 'src/infra/queue/queue.service';

@Injectable()
export class GetQueueMetrics {
  constructor(private readonly queueService: QueueService) {}

  async execute() {
    return await this.queueService.getMetrics();
  }
}
