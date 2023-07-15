import { Injectable } from '@nestjs/common';

import { Category } from '../../core/database/entities';

@Injectable()
export class CategoriesMapper {
  public toResponse(category: Category) {
    return { ...category, taskCount: category.tasks.length };
  }
  public toManyResponse(categories: Category[]) {
    return categories.map(this.toResponse);
  }
}
