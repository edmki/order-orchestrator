export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export abstract class ExchangeRateService {
  abstract getExchangeRate(currency: string): Promise<ExchangeRate>;
}
