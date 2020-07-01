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
    return await this.TodoService.getTodos({ deleted: false });
  }

  @Get('/category/:categoryid/user/:userid')
  async getTodosByCategoryIdAndUserId(
    @Param('categoryid') categoryid: string,
    @Param('userid') userid: string,
  ) {
    return this.TodoService.getTodos({
      category: categoryid,
      user: userid,
      deleted: false,
    });
  }

  @Get('deleted/user/:_id')
  async getDeletedTodosOfUser(@Param('_id') _id: string) {
    return this.TodoService.getTodos({ user: _id, deleted: true });
  }

  @Get('daily/user/:_id')
  async getDailyTodosOfUser(@Param('_id') _id: string) {
    const start = new Date();
    start.setHours(0, 0, 0);
    const end = new Date(start);
    end.setHours(11, 59, 0);

    return this.TodoService.getTodos({
      user: _id,
      date: {
        $gte: start,
        $lte: end,
      },
    });
  }

  @Get('done/user/:_id')
  async getDoneTodosOfUser(@Param('_id') _id: string) {
    return this.TodoService.getTodos({
      user: _id,
      completed: true,
    });
  }

  @Get('fav/user/:_id')
  async getFavTodosOfUser(@Param('_id') _id: string) {
    return this.TodoService.getTodos({
      user: _id,
      deleted: false,
      category: '5ef8f331b921f808f0807673',
    });
  }

  @Get('stat/user/:_id')
  async getUserStat(@Param('_id') _id: string) {
    const start = new Date();
    start.setHours(0, 0, 0);
    const end = new Date(start);
    end.setHours(11, 59, 0);

    const res = await this.TodoService.todoModel.aggregate([
      { $match: { user: _id } },
      {
        $project: {
          _daily: {
            $cond: [
              { $and: [{ $gte: ['$date', start] }, { $lte: ['$date', end] }] },
              1,
              0,
            ],
          },
          _deleted: {
            $cond: [{ $eq: ['$deleted', true] }, 1, 0],
          },
          _completed: {
            $cond: [{ $eq: ['$completed', true] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: 1,
          total: { $sum: 1 },
          daily: { $sum: '$_daily' },
          deleted: { $sum: '$_deleted' },
          completed: { $sum: '$_completed' },
        },
      },
    ]);

    return res[0];
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
