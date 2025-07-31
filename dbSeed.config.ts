import { join } from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import 'dotenv/config';

export const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432", 10),
    //entities: [join(process.cwd(), './src/**/*.entity{.ts,.js}')], //use this if want to seed data
    entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
    synchronize: true,

}