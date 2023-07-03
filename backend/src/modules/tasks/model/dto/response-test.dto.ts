import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { CategoryResponseDtoWithoutTasks } from '../../../categories/model/dto';

@ObjectType()
export class TaskResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  dateStart: Date;

  @Field({ nullable: true })
  dateEnd: Date;

  @Field(() => CategoryResponseDtoWithoutTasks)
  @Type(() => CategoryResponseDtoWithoutTasks)
  category: CategoryResponseDtoWithoutTasks;
}
