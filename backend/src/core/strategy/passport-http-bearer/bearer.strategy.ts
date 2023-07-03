import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { AuthService } from '../../../modules/auth/auth.service';
import { TokensService } from '../../../modules/tokens/tokens.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    const user = await this.authService.validationToken(token);

    await this.tokenService.findByAccessToken(token);

    return user;
  }
}
