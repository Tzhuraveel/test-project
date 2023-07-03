import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EUserRoles } from '../enum';

@ObjectType()
export class UserResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  role: EUserRoles;
}
