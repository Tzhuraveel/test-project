import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '../../core/database/entities';
import { EUserFieldDb } from './model/enum';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async findByUniqueField(
    field: string | number,
    dbField: EUserFieldDb,
  ) {
    return this.findOne({ where: { [dbField]: field } });
  }

  public async getAll(): Promise<User[]> {
    return await this.find();
  }
}
