import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class OrderCustomer {
  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;
}

class OrderItem {
  @ApiProperty({ example: 'ABC123' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  qty: number;

  @ApiProperty({ example: 10.99 })
  @IsNumber()
  unit_price: number;
}

export class CreateOrderRequest {
  @ApiProperty({ example: 'ext-123' })
  @IsString()
  order_id: string;

  @ApiProperty({ example: 'abc123' })
  @IsString()
  idempotency_key: string;

  @ApiProperty({ type: OrderCustomer })
  @ValidateNested()
  @Type(() => OrderCustomer)
  customer: OrderCustomer;

  @ApiProperty({ type: [OrderItem] })
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @IsArray()
  items: OrderItem[];

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;
}
