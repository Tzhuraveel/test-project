import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { AuthService } from '../../../modules/auth/auth.service';
import { TokensService } from '../../../modules/tokens/tokens.service';
import { EUserFieldDb } from '../../../modules/users/model/enum';
import { UsersService } from '../../../modules/users/users.service';
import { EFoundAction } from '../../enum';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    await this.tokenService.verifyAuthToken(token);

    const tokenFromDb = await this.tokenService.findByAccessToken(token);

    return await this.usersService.checkIsUserExist(
      EFoundAction.NEXT,
      tokenFromDb.userId,
      EUserFieldDb.ID,
    );
  }
}
