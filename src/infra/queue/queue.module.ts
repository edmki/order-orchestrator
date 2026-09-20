import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { Env } from 'src/shared/env';
import { OrderProcessor } from './processors/order.processor';
import { QueueService } from './queue.service';
import { ProcessOrder } from 'src/application/use-cases/process-order';
import { DatabaseModule } from '../database/database.module';
import { ExchangeRateModule } from '../integrations/exchange-rate/exchange-rate.module';

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
    DatabaseModule,
    ExchangeRateModule,
  ],
  providers: [OrderProcessor, QueueService, ProcessOrder],
  exports: [QueueService],
})
export class QueueModule {}
