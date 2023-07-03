import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Task, User } from '../../core/database/entities';
import { BearerGuard } from '../../core/strategy/passport-http-bearer';
import { UserData } from '../users/users.decorator';
import { CreateTaskDto, TaskResponseDto, UpdateTaskDto } from './model/dto';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(BearerGuard)
  @Mutation(() => TaskResponseDto)
  async createTask(
    @UserData() user: User,
    @Args({ name: 'categoryId', type: () => Int }) categoryId: number,
    @Args('createTask') task: CreateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.addTask(task, categoryId, user);
  }

  @UseGuards(BearerGuard)
  @Mutation(() => TaskResponseDto)
  async editTask(
    @UserData() user: User,
    @Args('editTask') task: UpdateTaskDto,
    @Args({ name: 'taskId', type: () => Int }) taskId: number,
  ): Promise<Task> {
    return await this.tasksService.editTask(task, taskId, user.id);
  }

  @UseGuards(BearerGuard)
  @Query(() => Boolean)
  async deleteTask(
    @UserData() user: User,
    @Args({ name: 'taskId', type: () => Int }) taskId: number,
  ): Promise<boolean> {
    await this.tasksService.deleteTask(taskId, user.id);

    return true;
  }
}
