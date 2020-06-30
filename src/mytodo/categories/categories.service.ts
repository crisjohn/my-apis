import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryInterface } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories') private categoryModel: Model<Category>,
  ) {}

  async getCategories(query: {} = {}): Promise<Array<Category>> {
    return this.categoryModel.find(query);
  }

  async createCategory(category: CategoryInterface): Promise<Category> {
    return this.categoryModel.create(category);
  }

  async updateCategory(category: CategoryInterface): Promise<Category> {
    return this.categoryModel.updateOne({ _id: category._id }, category);
  }

  async removeCategory(_id: string): Promise<{}> {
    const categoryRes: CategoryInterface = await (
      await this.categoryModel.findOne({ _id })
    ).toJSON();
    if (categoryRes._default) {
      throw new Error('cannot delete default category');
    } else {
      return this.categoryModel.remove({ _id });
    }
  }
}
