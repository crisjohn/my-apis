import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoInterface } from './todo.schema';

@Controller('mytodo/v1/todos')
export class TodosController {
  constructor(private readonly TodoService: TodosService) {}

  @Get()
  async getTodos() {
    return await this.TodoService.getTodos({});
  }

  @Post()
  async createTodo(@Body() todo: TodoInterface) {
    return await this.TodoService.createTodo(todo);
  }

  @Put()
  async updateTodo(@Body() todo: TodoInterface) {
    return await this.TodoService.updateTodo(todo);
  }

  @Delete(':_id')
  async removeTodo(@Param('_id') _id: string) {
    return await this.TodoService.removeTodo(_id);
  }
}
