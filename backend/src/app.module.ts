import * as path from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { UsersModule } from './modules/users';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'backend/src/schema.gql'),
    }),
    UsersModule,
  ],
})
export class AppModule {}
