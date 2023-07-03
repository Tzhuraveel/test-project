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

  public async getAll(user: User): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { user },
      relations: ['tasks', 'user'],
    });
  }

  public async addCategory(
    user: User,
    category: CreateCategoryDto,
  ): Promise<Category> {
    const createdCategory = await this.categoryRepository.create({
      name: category.name,
      user,
    });

    return await this.categoryRepository.save(createdCategory);
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
