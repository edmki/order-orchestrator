import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ProcessOrder } from 'src/application/use-cases/process-order';

interface OrderJobData {
  orderId: string;
}

@Processor('orders')
export class OrderProcessor extends WorkerHost {
  constructor(private readonly processOrder: ProcessOrder) {
    super();
  }

  async process(job: Job<OrderJobData>): Promise<void> {
    console.log('Job recebido:', job.name);
    console.log('Order ID:', job.data.orderId);

    await this.processOrder.execute(job.data.orderId);
  }
}
