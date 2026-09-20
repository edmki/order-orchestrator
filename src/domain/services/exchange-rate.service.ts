export abstract class ExchangeRateService {
  abstract getExchangeRate(currency: string): Promise<number>;
}
