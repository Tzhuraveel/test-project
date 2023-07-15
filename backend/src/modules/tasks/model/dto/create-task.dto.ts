import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { DateTime } from 'luxon';

@InputType()
export class CreateTaskDto {
  @Field()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Field can only contain letters and spaces',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(5, 15)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 200)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null) {
      return null;
    }
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  dateStart?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null) {
      return null;
    }
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  dateEnd?: string;
}
