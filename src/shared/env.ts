import 'dotenv/config';

export class Env {
  static get databaseUrl(): string {
    return Env.get('DATABASE_URL');
  }

  static get port(): number {
    return Number(Env.get('PORT', '3001'));
  }

  private static get(key: string, fallback?: string): string {
    const value = process.env[key] ?? fallback;
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}
