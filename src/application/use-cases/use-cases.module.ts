import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { CreateOrder } from './orders/create-order';
import { ProcessOrder } from './orders/process-order';
import { HandleOrderEnrichmentFailure } from './orders/handle-order-enrichment-failure';
import { GetQueueMetrics } from './queue/get-queue-metrics';
import { GetOrderById } from './orders/get-order-by-id';
import { ListOrders } from './orders/list-orders';

@Module({
  imports: [InfraModule],
  providers: [
    CreateOrder,
    ProcessOrder,
    HandleOrderEnrichmentFailure,
    GetQueueMetrics,
    GetOrderById,
    ListOrders,
  ],
  exports: [
    CreateOrder,
    ProcessOrder,
    HandleOrderEnrichmentFailure,
    GetQueueMetrics,
    GetOrderById,
    ListOrders,
  ],
})
export class UseCasesModule {}
