import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isMatched = await bcrypt.compare(password, hashedPassword);

    if (!isMatched) {
      throw new BadRequestException('Wrong name or password');
    }
  }
}
