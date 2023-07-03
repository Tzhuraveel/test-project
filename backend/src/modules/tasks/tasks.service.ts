import { Injectable, NotFoundException } from '@nestjs/common';

import { Category, Task, User } from '../../core/database/entities';
import { CategoriesService } from '../categories/categories.service';
import { CreateTaskDto, UpdateTaskDto } from './model/dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  public async findByIdAndUserId(id: number, userId: number): Promise<Task> {
    const task: Task = await this.tasksRepository.findByIdAndUserId(id, userId);

    if (!task) throw new NotFoundException('task not found');

    return task;
  }

  public async addTask(
    taskData: CreateTaskDto,
    categoryId: number,
    user: User,
  ): Promise<Task> {
    const category: Category = await this.categoriesService.findByIdAndUserId(
      categoryId,
      user.id,
    );

    const createdTask = await this.tasksRepository.create({
      name: taskData.name,
      description: taskData.description,
      dateStart: taskData.dateStart,
      dateEnd: taskData.dateEnd,
      category,
    });

    await this.tasksRepository.save(createdTask);

    return await this.tasksRepository.findOne({
      where: { id: createdTask.id },
      relations: ['category', 'category.user'],
    });
  }

  public async editTask(
    taskData: UpdateTaskDto,
    taskId: number,
    userId: number,
  ): Promise<Task> {
    await this.findByIdAndUserId(taskId, userId);

    await this.tasksRepository.update(taskId, {
      name: taskData.name,
      description: taskData.description,
      dateStart: taskData.dateStart,
      dateEnd: taskData.dateEnd,
    });

    return await this.tasksRepository.findOneBy({ id: taskId });
  }

  public async deleteTask(taskId: number, userId: number): Promise<void> {
    await this.findByIdAndUserId(taskId, userId);

    await this.tasksRepository.delete(taskId);
  }
}
