import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { RegisterDto } from '../../../auth/model/dto';

@InputType()
export class UpdateUserInput extends PartialType(RegisterDto) {
  @Field(() => Int)
  id: number;
}
