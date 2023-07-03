import { InputType } from '@nestjs/graphql';

import { RegisterDto } from './create-user.dto';

@InputType()
export class LoginDto extends RegisterDto {}
