import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ExchangeRateService } from 'src/domain/services/exchange-rate.service';
import { Env } from 'src/shared/env';

interface ExchangeRateResponse {
  rates: Record<string, number>;
}

@Injectable()
export class AxiosExchangeRateService implements ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate(currency: string): Promise<number> {
    const targetCurrency = Env.targetExchangeRateCurrency;

    if (currency === targetCurrency) {
      return 1;
    }

    const response = await firstValueFrom(
      this.httpService.get<ExchangeRateResponse>('/latest', {
        params: {
          from: currency,
          to: targetCurrency,
        },
      }),
    );

    return response.data.rates[targetCurrency];
  }
}
