import { Module } from '@nestjs/common';

import { CategoriesModule } from '../categories';
import { TasksRepository } from './tasks.repository';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [CategoriesModule],
  providers: [TasksResolver, TasksService, TasksRepository],
  exports: [TasksService],
})
export class TasksModule {}
