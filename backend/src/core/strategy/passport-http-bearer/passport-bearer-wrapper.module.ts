import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../../../modules/auth';
import { TokenModule } from '../../../modules/tokens';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    AuthModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [BearerStrategy],
})
export class PassportWrapperModule {}
