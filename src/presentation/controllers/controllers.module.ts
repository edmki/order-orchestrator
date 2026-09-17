import { Module } from '@nestjs/common';
import { CreateOrderController } from './create-order/controller';
import { UseCasesModule } from 'src/application/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [CreateOrderController],
})
export class ControllersModule {}
