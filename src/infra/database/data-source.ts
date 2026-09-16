import { DataSource } from 'typeorm';
import { Env } from '../../shared/env';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: Env.databaseUrl,
  entities: [__dirname + '/schemas/*.schema{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
