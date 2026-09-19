import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('orders')
export class OrderProcessor extends WorkerHost {
  async process(job: Job): Promise<any> {
    console.log('Job recebido:', job.name);
    console.log('Dados:', job.data);
  }
}
