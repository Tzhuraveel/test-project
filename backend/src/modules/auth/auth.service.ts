import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../../core/database/entities';
import { EFoundAction } from '../../core/enum';
import { ITokenPair, ITokenPayload } from '../tokens/model/interface';
import { TokensRepository } from '../tokens/tokens.repository';
import { TokensService } from '../tokens/tokens.service';
import { EUserFieldDb } from '../users/model/enum';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './model/dto';
import { LoginResponseDto } from './model/dto/login-user-response.dto';
import { PasswordService } from './passoword.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UsersRepository,
    private readonly tokenService: TokensService,
    private readonly tokenRepository: TokensRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async validationToken(token: string): Promise<User> {
    const payload: ITokenPayload = await this.tokenService.verifyAuthToken(
      token,
    );

    const user = await this.usersService.checkIsUserExist(
      EFoundAction.NEXT,
      payload.userId,
      EUserFieldDb.ID,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }

  public async register(credentials: RegisterDto): Promise<void> {
    await this.usersService.checkIsUserExist(
      EFoundAction.THROW,
      credentials.name,
      EUserFieldDb.NAME,
    );

    const hashedPassword: string = await this.passwordService.hash(
      credentials.password,
    );

    await this.userRepository.save({
      password: hashedPassword,
      name: credentials.name,
    });
  }

  public async login(credentials: any): Promise<LoginResponseDto> {
    const userFromDb = await this.usersService.checkIsUserExist(
      EFoundAction.NEXT,
      credentials.name,
      EUserFieldDb.NAME,
    );

    await this.passwordService.compare(
      credentials.password,
      userFromDb.password,
    );

    const tokenPair: ITokenPair = await this.tokenService.createTokenPair({
      name: userFromDb.name,
      userId: userFromDb.id,
    });

    return { ...tokenPair, user: userFromDb };
  }

  public async refresh(refreshToken: string): Promise<ITokenPair> {
    const user = await this.validationToken(refreshToken);

    await this.tokenService.findByRefreshToken(refreshToken);

    const [tokenPair] = await Promise.all([
      await this.tokenService.createTokenPair({
        name: user.name,
        userId: user.id,
      }),
      await this.tokenRepository.delete({ refreshToken }),
    ]);

    return tokenPair;
  }
}
