import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements OnModuleDestroy {
  constructor(
    @InjectQueue('orders')
    private readonly ordersQueue: Queue,
  ) {}

  async addOrder(orderId: string) {
    await this.ordersQueue.add('process-order', {
      orderId,
    });
  }

  async onModuleDestroy() {
    await this.ordersQueue.close();
  }
}
