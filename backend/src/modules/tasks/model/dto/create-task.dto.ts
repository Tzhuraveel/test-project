import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsDate,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { DateTime } from 'luxon';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsAlpha()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(5, 15)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(15, 200)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  dateStart?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  dateEnd?: string;
}
