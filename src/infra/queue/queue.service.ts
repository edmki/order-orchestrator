import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements OnModuleDestroy {
  constructor(
    @InjectQueue('orders')
    private readonly ordersQueue: Queue,

    @InjectQueue('orders-dlq')
    private readonly deadLetterQueue: Queue,
  ) {}

  async addOrder(orderId: string) {
    await this.ordersQueue.add('process-order', {
      orderId,
    });
  }

  async addToDeadLetterQueue(orderId: string) {
    await this.deadLetterQueue.add('orders-dlq', {
      orderId,
    });
  }

  async getMetrics() {
    const [orders, deadLetter] = await Promise.all([
      this.ordersQueue.getJobCounts(),
      this.deadLetterQueue.getJobCounts(),
    ]);

    return {
      orders,
      deadLetter,
    };
  }

  async onModuleDestroy() {
    await this.ordersQueue.close();
    await this.deadLetterQueue.close();
  }
}
