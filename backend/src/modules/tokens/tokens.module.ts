import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule } from '../../config/app';
import { AppConfigService } from '../../config/app';
import { TokensRepository } from './tokens.repository';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.secretKey,
        signOptions: {
          expiresIn: '10m',
        },
        global: true,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [TokensService, TokensRepository],
  exports: [TokensService, TokensRepository],
})
export class TokenModule {}
