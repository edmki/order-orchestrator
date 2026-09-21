import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HandleOrderEnrichmentFailure } from 'src/application/use-cases/orders/handle-order-enrichment-failure';
import { ProcessOrder } from 'src/application/use-cases/orders/process-order';

interface OrderJobData {
  orderId: string;
}

@Processor('orders')
export class OrderProcessor extends WorkerHost {
  constructor(
    private readonly processOrder: ProcessOrder,
    private readonly handleOrderEnrichmentFailure: HandleOrderEnrichmentFailure,
  ) {
    super();
  }

  async process(job: Job<OrderJobData>): Promise<void> {
    await this.processOrder.execute(job.data.orderId);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job<OrderJobData>, error: Error) {
    console.error('Job falhou:', job.name, error);

    const maxAttempts = job.opts.attempts ?? 1;

    if (job.attemptsMade < maxAttempts) {
      return;
    }

    await this.handleOrderEnrichmentFailure.execute(job.data.orderId);
  }
}
