import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { Env } from 'src/shared/env';
import { OrderProcessor } from './processors/order.processor';
import { QueueService } from './queue.service';
import { ProcessOrder } from 'src/application/use-cases/orders/process-order';
import { DatabaseModule } from '../database/database.module';
import { ExchangeRateModule } from '../integrations/exchange-rate/exchange-rate.module';
import { HandleOrderEnrichmentFailure } from 'src/application/use-cases/orders/handle-order-enrichment-failure';

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
    BullModule.registerQueue(
      {
        name: 'orders',
        defaultJobOptions: {
          attempts: Env.queueRetryAttempts,
          backoff: {
            type: 'exponential',
            delay: Env.queueRetryDelay,
          },
        },
      },
      { name: 'orders-dlq' },
    ),
    DatabaseModule,
    ExchangeRateModule,
  ],
  providers: [
    OrderProcessor,
    QueueService,
    ProcessOrder,
    HandleOrderEnrichmentFailure,
  ],
  exports: [QueueService],
})
export class QueueModule {}
