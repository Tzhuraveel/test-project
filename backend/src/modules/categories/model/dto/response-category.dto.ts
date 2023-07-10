import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskResponseDto } from '../../../tasks/model/dto';
import { UserResponseDto } from '../../../users/model/dto';

@ObjectType()
export class CategoryResponseDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  dateCreated: Date;

  @Field()
  taskCount: number;

  // @Field(() => UserResponseDto)
  // @Type(() => UserResponseDto)
  // user: UserResponseDto;
  //
  @Field(() => [TaskResponseDto])
  @Type(() => TaskResponseDto)
  tasks: TaskResponseDto[];
}

@ObjectType()
export class CategoryResponseDtoWithoutTasks extends OmitType(
  CategoryResponseDto,
  ['tasks'] as const,
) {}
