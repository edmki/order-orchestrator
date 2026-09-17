import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from 'src/shared/env';
import { OrderSchema } from './schemas/order.schema';
import { Module } from '@nestjs/common';
import { PostgreSqlOrderRepository } from './repositories/postgresql-order-repository';
import { OrderRepository } from 'src/domain/repositories/order-repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: Env.databaseUrl,
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([OrderSchema]),
  ],
  providers: [
    {
      provide: OrderRepository,
      useClass: PostgreSqlOrderRepository,
    },
  ],
  exports: [OrderRepository],
})
export class DatabaseModule {}
