import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field({ description: 'Name of user' })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Length(2, 50)
  name: string;

  @Field({ description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
