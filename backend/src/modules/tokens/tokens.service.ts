import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql/error';

import { ITokenPair, ITokenPayload } from './model/interface';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class TokensService {
  constructor(
    private readonly tokenRepository: TokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async verifyAuthToken(token): Promise<ITokenPayload> {
    const payload: ITokenPayload = await this.jwtService.verifyAsync(token);

    if (!payload) {
      throw new GraphQLError('Token not found', {
        extensions: {
          code: HttpStatus.BAD_REQUEST,
        },
      });
    }

    return payload;
  }

  public async findByAccessToken(accessToken: string) {
    const tokenFromDb = await this.tokenRepository.findOneBy({ accessToken });

    if (!tokenFromDb)
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    return tokenFromDb;
  }

  public async findByRefreshToken(refreshToken: string) {
    const tokenFromDb = await this.tokenRepository.findOneBy({ refreshToken });

    if (!tokenFromDb)
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    return tokenFromDb;
  }

  public async createTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '20m' }),
    ]);

    await this.tokenRepository.save({
      accessToken,
      refreshToken,
      userId: payload.userId,
    });

    return { accessToken, refreshToken };
  }
}
