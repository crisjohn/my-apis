import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoInterface } from './todo.schema';
import { Model } from 'mongoose';
import { User, UserInterface } from '../users/user.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('todos') private todoModel: Model<Todo>,
    @InjectModel('users') private userModel: Model<User>,
  ) {}

  async getTodos(query = {}): Promise<Array<Todo>> {
    return this.todoModel.find(query).populate('category', 'name color');
  }

  async createTodo(todo: TodoInterface): Promise<Todo> {
    const _todo = await this.todoModel.create(todo);
    const res: TodoInterface = await _todo.toJSON();
    await this.userModel.updateOne(
      { _id: res.user },
      { $push: { todos: res._id } },
    );
    return _todo;
  }

  async updateTodo(todo: TodoInterface): Promise<Todo> {
    return this.todoModel.updateOne({ _id: todo._id }, todo);
  }

  async removeTodo(_id: string): Promise<{}> {
    return this.todoModel.updateOne({ _id }, { deleted: true });
  }
}
