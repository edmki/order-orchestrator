import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { CreateOrder } from './create-order';
import { ProcessOrder } from './process-order';

@Module({
  imports: [InfraModule],
  providers: [CreateOrder, ProcessOrder],
  exports: [CreateOrder, ProcessOrder],
})
export class UseCasesModule {}
