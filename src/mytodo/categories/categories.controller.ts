import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryInterface } from './category.schema';

@Controller('mytodo/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.getCategories({});
  }

  @Get(':_id')
  async getCategory(@Param('_id') _id: string) {
    return await this.categoryService.getCategories({ _id });
  }

  @Post()
  async createCategory(@Body() category: CategoryInterface) {
    return await this.categoryService.createCategory(category);
  }

  @Put()
  async updateCategory(@Body() category: CategoryInterface) {
    return await this.categoryService.updateCategory(category);
  }

  @Delete(':_id')
  async removeCategory(@Param('_id') _id: string) {
    return await this.categoryService.removeCategory(_id);
  }
}
