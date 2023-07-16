import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Matches(/^([А-ЩЬЮЯҐЄІЇа-щьюяґєії]|[a-zA-Z\s])*$/, {
    message: 'Ukrainian and English letters only',
  })
  @Length(5, 15)
  name: string;
}
