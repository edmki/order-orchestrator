import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetOrderById } from 'src/application/use-cases/orders/get-order-by-id';

@Controller('orders')
@ApiTags('Orders')
export class GetOrderByIdController {
  constructor(private readonly getOrderById: GetOrderById) {}

  @Get(':id')
  async handle(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const order = await this.getOrderById.execute(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
}
