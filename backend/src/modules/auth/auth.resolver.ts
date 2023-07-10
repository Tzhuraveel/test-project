import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../../core/database/entities';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './model/dto';
import { LoginResponseDto } from './model/dto/login-user-response.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(
    @Args('credentials') credentials: RegisterDto,
  ): Promise<boolean> {
    await this.authService.register(credentials);

    return true;
  }

  @Mutation(() => LoginResponseDto)
  async login(
    @Args('credentials') credentials: LoginDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(credentials);
  }
}
