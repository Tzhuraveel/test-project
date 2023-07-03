import { Field, ObjectType } from '@nestjs/graphql';

import { TokenResponseDto } from '../../../tokens/model/dto';
import { UserResponseDto } from '../../../users/model/dto';

@ObjectType()
export class LoginResponseDto extends TokenResponseDto {
  @Field()
  user: UserResponseDto;
}
