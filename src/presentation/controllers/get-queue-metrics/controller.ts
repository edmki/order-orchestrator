import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetQueueMetrics } from 'src/application/use-cases/queue/get-queue-metrics';
import { GetQueueMetricsResponse } from './response';

@Controller('queue')
@ApiTags('Queue')
export class GetQueueMetricsController {
  constructor(private readonly getQueueMetrics: GetQueueMetrics) {}

  @Get('metrics')
  @ApiResponse({
    type: GetQueueMetricsResponse,
    status: 200,
    description: 'Queue metrics',
  })
  async handle() {
    return await this.getQueueMetrics.execute();
  }
}
