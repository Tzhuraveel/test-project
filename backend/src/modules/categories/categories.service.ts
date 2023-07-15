import { Injectable, NotFoundException } from '@nestjs/common';

import { Category, User } from '../../core/database/entities';
import { CategoriesMapper } from './categories.mapper';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './model/dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoriesRepository,
    private readonly categoriesMapper: CategoriesMapper,
  ) {}

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
    const category = await this.categoryRepository.find({
      where: { user },
      relations: { tasks: true },
      order: {
        id: 'ASC',
      },
    });

    return this.categoriesMapper.toManyResponse(category);
  }

  public async addCategory(
    user: User,
    category: CreateCategoryDto,
  ): Promise<Category> {
    const createdCategoryModel = this.categoryRepository.create({
      name: category.name,
      user,
    });

    const createdCategory = await this.categoryRepository.save(
      createdCategoryModel,
    );

    const categoryFromDb = await this.categoryRepository.findOne({
      where: { id: createdCategory.id },
      relations: { tasks: true },
    });

    return this.categoriesMapper.toResponse(categoryFromDb);
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
