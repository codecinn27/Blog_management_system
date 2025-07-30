import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'db.Config';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', //code first approach, generate the GraphQL schema into this file
      debug: true,
      playground: true, // enable localhost:3000/graphql browser environment to test the query
    }),

    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
