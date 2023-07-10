import { Injectable, NotFoundException } from '@nestjs/common';

import { Category, User } from '../../core/database/entities';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './model/dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  public async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<Category> {
    const category: Category = await this.categoryRepository.findByIdAndUserId(
      id,
      userId,
    );

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  public async getAll({ id }: User): Promise<Category[]> {
    const newVar = await this.categoryRepository
      .createQueryBuilder('category')
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('category.dateCreated', 'dateCreated')
      .where('category.user = :id', { id })
      .leftJoin('category.tasks', 'tasks')
      .addSelect('COUNT(tasks)', 'taskCount')
      .groupBy('category.id')
      .getRawMany();

    return newVar;
  }

  public async addCategory(
    user: User,
    category: CreateCategoryDto,
  ): Promise<Category> {
    const createdCategory = await this.categoryRepository.save({
      name: category.name,
      user,
    });

    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.tasks', 'tasks')
      .where('category.id = :id', { id: createdCategory.id })
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('category.dateCreated', 'dateCreated')
      .addSelect('COUNT(tasks)', 'taskCount')
      .groupBy('category.id')
      .getOne();

    console.log(result);

    return result;
  }

  public async editCategory(
    categoryId: number,
    category: UpdateCategoryDto,
    user: User,
  ): Promise<Category> {
    await this.findByIdAndUserId(categoryId, user.id);

    await this.categoryRepository.update(categoryId, { name: category.name });

    return await this.categoryRepository.findOneBy({ id: categoryId });
  }

  public async deleteCategory(categoryId: number, user: User): Promise<void> {
    await this.findByIdAndUserId(categoryId, user.id);

    await this.categoryRepository.delete(categoryId);
  }
}
