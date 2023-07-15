import { Module } from '@nestjs/common';

import { CategoriesMapper } from './categories.mapper';
import { CategoriesRepository } from './categories.repository';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    CategoriesRepository,
    CategoriesMapper,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
