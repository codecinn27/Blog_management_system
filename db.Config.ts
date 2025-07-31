import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from 'path';
import 'dotenv/config';
import { registerAs } from "@nestjs/config";

export default registerAs(
    'dbconfig.dev',
    (): PostgresConnectionOptions =>({
        url: process.env.DB_HOST,
        type: 'postgres',
        entities: [path.resolve(__dirname, '..')+ '/**/*.entity{.ts,.js}'],

        synchronize: true,
    })
)

// export const pgConfig: PostgresConnectionOptions = {
//     type: 'postgres',
//     url: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT ?? "5432", 10),
//     // entities: [join(process.cwd(), './src/**/*.entity{.ts,.js}')], //use this if want to seed data
//     entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
//     synchronize: true,

// }