import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { join } from 'path';
import 'dotenv/config';

export const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432", 10),
    entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js')],
    synchronize: true,

}