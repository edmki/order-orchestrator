import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from 'src/shared/env';
import { OrderSchema } from './schemas/order.schema';
import { Module } from '@nestjs/common';

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
  providers: [],
  exports: [],
})
export class DatabaseModule {}
