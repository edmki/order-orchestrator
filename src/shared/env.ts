import 'dotenv/config';

export class Env {
  static get databaseUrl(): string {
    return Env.get('DATABASE_URL');
  }

  static get port(): number {
    return Number(Env.get('PORT', '3001'));
  }

  static get redisHost(): string {
    return Env.get('REDIS_HOST');
  }

  static get redisPort(): number {
    return Number(Env.get('REDIS_PORT', '6379'));
  }

  static get queueRetryAttempts(): number {
    return Number(Env.get('QUEUE_RETRY_ATTEMPTS', '3'));
  }

  static get queueRetryDelay(): number {
    return Number(Env.get('QUEUE_RETRY_DELAY', '5000'));
  }

  static get exchangeRateApiUrl(): string {
    return Env.get('EXCHANGE_RATE_API_URL', 'https://api.frankfurter.dev/v1');
  }

  static get targetExchangeRateCurrency(): string {
    return Env.get('TARGET_EXCHANGE_RATE_CURRENCY', 'BRL');
  }

  private static get(key: string, fallback?: string): string {
    const value = process.env[key] ?? fallback;
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}
