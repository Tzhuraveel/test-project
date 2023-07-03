import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Task } from '../../core/database/entities';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.manager);
  }

  public async findByIdAndUserId(id: number, userId: number): Promise<Task> {
    return await this.findOneBy({
      id,
      category: { user: { id: userId } },
    });
  }
}
