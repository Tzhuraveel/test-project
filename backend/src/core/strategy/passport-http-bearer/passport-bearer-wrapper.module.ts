import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../../../modules/auth';
import { TokenModule } from '../../../modules/tokens';
import { UsersModule } from '../../../modules/users';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    AuthModule,
    TokenModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [BearerStrategy],
})
export class PassportWrapperModule {}
