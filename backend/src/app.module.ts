import * as path from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpStatus, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFormattedError } from 'graphql/error';

import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { PassportWrapperModule } from './core/strategy/passport-http-bearer';
import { AuthModule } from './modules/auth';
import { CategoriesModule } from './modules/categories';
import { TasksModule } from './modules/tasks';
import { UsersModule } from './modules/users';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLFormattedError): any => {
        return {
          message: error.message || 'Server error',
          code: error.extensions?.code || HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    PassportWrapperModule,
    CategoriesModule,
  ],
})
export class AppModule {}
