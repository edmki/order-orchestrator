import { ApiProperty } from '@nestjs/swagger';

class QueueMetrics {
  @ApiProperty({ example: 10 })
  active: number;

  @ApiProperty({ example: 5 })
  completed: number;

  @ApiProperty({ example: 2 })
  delayed: number;

  @ApiProperty({ example: 1 })
  failed: number;

  @ApiProperty({ example: 3 })
  prioritized: number;

  @ApiProperty({ example: 4 })
  waiting: number;

  @ApiProperty({ example: 0 })
  waitingChildren: number;
}

export class GetQueueMetricsResponse {
  @ApiProperty({ description: 'Metrics for the orders queue' })
  orders: QueueMetrics;

  @ApiProperty({ description: 'Metrics for the dead letter queue' })
  deadLetter: QueueMetrics;
}
