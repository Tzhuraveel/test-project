import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../../core/database/entities';
import { EFoundAction } from '../../core/enum';
import { EUserFieldDb } from './model/enum';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async checkIsUserExist(
    actionWithFoundField: EFoundAction,
    field: string | number,
    dbField: EUserFieldDb,
  ): Promise<User> {
    const foundItem = await this.userRepository.findByUniqueField(
      field,
      dbField,
    );

    switch (actionWithFoundField) {
      case EFoundAction.NEXT:
        if (!foundItem) throw new NotFoundException('User not found');
        return foundItem;
      case EFoundAction.THROW:
        if (foundItem) throw new HttpException('User already exist', 400);
        break;
    }
  }
}
