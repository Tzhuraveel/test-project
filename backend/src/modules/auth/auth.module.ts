import { Module } from '@nestjs/common';

import { TokenModule } from '../tokens';
import { UsersModule } from '../users';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './passoword.service';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService, PasswordService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
