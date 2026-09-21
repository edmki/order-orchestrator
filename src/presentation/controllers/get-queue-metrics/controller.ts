import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetQueueMetrics } from 'src/application/use-cases/queue/get-queue-metrics';

@Controller('queue')
@ApiTags('Queue')
export class GetQueueMetricsController {
  constructor(private readonly getQueueMetrics: GetQueueMetrics) {}

  @Get('metrics')
  async handle() {
    return await this.getQueueMetrics.execute();
  }
}
