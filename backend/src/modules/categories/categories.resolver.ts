import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Category, User } from '../../core/database/entities';
import { BearerGuard } from '../../core/strategy/passport-http-bearer';
import { UserData } from '../users/users.decorator';
import { CategoriesService } from './categories.service';
import {
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './model/dto';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(BearerGuard)
  @Mutation(() => CategoryResponseDto)
  async createCategory(
    @UserData() user: User,
    @Args('createCategory') category: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.addCategory(user, category);
  }

  @UseGuards(BearerGuard)
  @Query(() => [CategoryResponseDto])
  async getAllCategories(@UserData() user: User): Promise<Category[]> {
    return await this.categoriesService.getAll(user);
  }

  @UseGuards(BearerGuard)
  @Mutation(() => CategoryResponseDto)
  async editCategory(
    @UserData() user: User,
    @Args({ name: 'categoryId', type: () => Int }) categoryId: number,
    @Args('editCategory') category: UpdateCategoryDto,
  ): Promise<CategoryResponseDto | any> {
    return await this.categoriesService.editCategory(
      categoryId,
      category,
      user,
    );
  }

  @UseGuards(BearerGuard)
  @Mutation(() => Boolean)
  async deleteCategory(
    @UserData() user: User,
    @Args({ name: 'categoryId', type: () => Int }) categoryId: number,
  ): Promise<boolean> {
    await this.categoriesService.deleteCategory(categoryId, user);

    return true;
  }
}
