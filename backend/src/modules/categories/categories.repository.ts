import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Category } from '../../core/database/entities';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.manager);
  }

  public async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<Category> {
    return await this.findOneBy({ id, user: { id: userId } });
  }
}
