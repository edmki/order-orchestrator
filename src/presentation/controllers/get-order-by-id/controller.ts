import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrderById } from 'src/application/use-cases/orders/get-order-by-id';
import { OrderResponseDto } from 'src/presentation/dto/order-response';

@Controller('orders')
@ApiTags('Orders')
export class GetOrderByIdController {
  constructor(private readonly getOrderById: GetOrderById) {}

  @Get(':id')
  @ApiResponse({
    type: OrderResponseDto,
    status: 200,
    description: 'Order found',
  })
  async handle(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<OrderResponseDto> {
    const order = await this.getOrderById.execute(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
}
