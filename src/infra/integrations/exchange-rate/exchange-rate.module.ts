import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExchangeRateService } from 'src/domain/services/exchange-rate.service';
import { AxiosExchangeRateService } from './axios-exchange-rate.service';
import { Env } from 'src/shared/env';

@Module({
  imports: [
    HttpModule.register({
      baseURL: Env.exchangeRateApiUrl,
    }),
  ],
  providers: [
    {
      provide: ExchangeRateService,
      useClass: AxiosExchangeRateService,
    },
  ],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
