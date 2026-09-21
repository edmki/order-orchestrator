import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { ExchangeRateModule } from './integrations/exchange-rate/exchange-rate.module';

@Module({
  imports: [DatabaseModule, QueueModule, ExchangeRateModule],
  exports: [DatabaseModule, QueueModule, ExchangeRateModule],
})
export class InfraModule {}
