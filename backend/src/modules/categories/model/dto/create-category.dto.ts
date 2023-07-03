import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlpha, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsAlpha()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(5, 20)
  name: string;
}
