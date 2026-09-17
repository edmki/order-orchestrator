import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { CreateOrder } from './create-order';

@Module({
  imports: [InfraModule],
  providers: [CreateOrder],
  exports: [CreateOrder],
})
export class UseCasesModule {}
