import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Path from 'path';
import { DataSourceOptions } from 'typeorm';

import { MySqlConfigModule } from './config.module';
import { MySqlConfigService } from './configuration.service';
import { MySqlConfigServiceStatic } from './configuration.service-static';

export class TypeOrmConfigurations {
  static get workingDirectory(): string {
    let path = Path.dirname(require.main.filename);
    const index = path.indexOf('api');
    if (index !== -1) {
      path = path.slice(0, index + 'api'.length);
    }

    return path;
  }

  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [MySqlConfigModule],
      useFactory: (configService: MySqlConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,

        database: configService.database,
        synchronize: true,
        // migrationsRun: configService.runMigrations,
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        // migrationsTableName: 'migrations',
        // migrations: [
        //   `${this.workingDirectory}src/core/database/migrations/*.ts`,
        // ],
        // cli: {
        //   migrationsDir: 'src/core/database/migrations',
        // },
      }),
      inject: [MySqlConfigService],
    };
  }

  static get staticConfig(): DataSourceOptions {
    const folder = !process.env.NODE_ENV ? 'src' : 'dist/src';
    return {
      name: 'default',
      type: 'postgres',
      host: MySqlConfigServiceStatic.host,
      port: MySqlConfigServiceStatic.port,
      username: MySqlConfigServiceStatic.user,
      password: MySqlConfigServiceStatic.password,
      database: MySqlConfigServiceStatic.database,
      synchronize: false,
      migrationsRun: MySqlConfigServiceStatic.runMigrations,
      migrationsTableName: 'migrations',
      entities: [folder + '/**/*.entity{.ts,.js}'],
      migrations: [folder + '/core/database/migrations/*{.js,.ts}'],
    };
  }
}
