import { Controller, Get, ParseEnumPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListOrders } from 'src/application/use-cases/orders/list-orders';
import { OrderStatus } from 'src/domain/enums/order-status';

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
  async handle(
    @Query('status', new ParseEnumPipe(OrderStatus, { optional: true }))
    status?: OrderStatus,
  ) {
    const orders = await this.listOrders.execute(status);
    return orders;
  }
}
