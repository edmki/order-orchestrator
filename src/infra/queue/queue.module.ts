import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { Env } from 'src/shared/env';
import { OrderProcessor } from './processors/order.processor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          host: Env.redisHost,
          port: Env.redisPort,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  providers: [OrderProcessor, QueueService],
  exports: [QueueService],
})
export class QueueModule {}
