import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskResponseDto } from '../../../tasks/model/dto';

@ObjectType()
export class CategoryResponseDto {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  dateCreated: Date;

  @Field({ nullable: true })
  taskCount: number;

  @Field(() => [TaskResponseDto], { nullable: true })
  @Type(() => TaskResponseDto)
  tasks: TaskResponseDto[];
}

@ObjectType()
export class CategoryResponseDtoWithoutTasks extends OmitType(
  CategoryResponseDto,
  ['tasks'] as const,
) {}
