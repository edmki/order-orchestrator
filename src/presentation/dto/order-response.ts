import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/domain/enums/order-status';

class CustomerResponse {
  @ApiProperty({
    description: 'Customer email',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  name: string;
}

class ItemResponse {
  @ApiProperty({ description: 'Item SKU', example: 'SKU12345' })
  sku: string;

  @ApiProperty({ description: 'Item quantity', example: 2 })
  qty: number;

  @ApiProperty({ description: 'Item unit price', example: 19.99 })
  unitPrice: number;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'Database ID',
    example: 'ab12cd34-56ef-78gh-90ij-klmnopqrstuv',
  })
  id: string;

  @ApiProperty({ description: 'Order ID', example: 'ORD-001' })
  orderId: string;

  @ApiProperty({ description: 'Idempotency Key', example: 'unique-key-123' })
  idempotencyKey: string;

  @ApiProperty({ description: 'Customer information', type: CustomerResponse })
  customer: CustomerResponse;

  @ApiProperty({ description: 'List of order items', type: [ItemResponse] })
  items: ItemResponse[];

  @ApiProperty({ description: 'Currency code', example: 'USD' })
  currency: string;

  @ApiProperty({ description: 'Order status', example: OrderStatus.COMPLETED })
  status: OrderStatus;

  @ApiProperty({
    description: 'Enrichment data',
    example: { key: 'value' },
    required: false,
  })
  enrichmentData?: Record<string, any> | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-02T12:00:00Z',
  })
  updatedAt: Date;
}
