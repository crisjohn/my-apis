import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, TodosModule, UsersModule]
})
export class MytodoModule {}
