import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../db.Config';
import { pgConfig } from '../dbSeed.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(pgConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', //code first approach, generate the GraphQL schema into this file
      debug: true,
      playground: true, // enable localhost:3000/graphql browser environment to test the query
    }),

    UserModule,

    AuthModule,

    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
