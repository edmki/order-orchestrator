import { Controller, Get, ParseEnumPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListOrders } from 'src/application/use-cases/orders/list-orders';
import { OrderStatus } from 'src/domain/enums/order-status';
import { ListOrdersResponse } from './response';

@Controller('orders')
@ApiTags('Orders')
export class ListOrdersController {
  constructor(private readonly listOrders: ListOrders) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    enum: OrderStatus,
  })
  @ApiResponse({
    type: [ListOrdersResponse],
    status: 200,
    description: 'List of orders',
  })
  async handle(
    @Query('status', new ParseEnumPipe(OrderStatus, { optional: true }))
    status?: OrderStatus,
  ): Promise<ListOrdersResponse[]> {
    const orders = await this.listOrders.execute(status);
    return orders;
  }
}
