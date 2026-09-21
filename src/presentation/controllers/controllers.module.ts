import { Module } from '@nestjs/common';
import { CreateOrderController } from './create-order/controller';
import { UseCasesModule } from 'src/application/use-cases/use-cases.module';
import { GetQueueMetricsController } from './get-queue-metrics/controller';
import { GetOrderByIdController } from './get-order-by-id/controller';
import { ListOrdersController } from './list-orders/controller';

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateOrderController,
    GetOrderByIdController,
    ListOrdersController,
    GetQueueMetricsController,
  ],
})
export class ControllersModule {}
