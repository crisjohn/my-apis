import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Controller('mytodo/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUser();
  }

  @Get('category/:_id')
  async getUserCategory(@Param('_id') _id: string) {
    return await this.userService.userModel
      .findOne({ _id })
      .populate('categories')
      .populate('todos');
  }

  @Post()
  async createUser(@Body() user: UserInterface) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    return await this.userService.createUser({
      ...user,
      password: hash,
      categories: ['5ef8f31ab921f808f0807669', '5ef8f331b921f808f0807673'],
    });
  }

  @Put()
  async updateUser(@Body() user: UserInterface) {
    return await this.userService.updateUser(user);
  }

  @Delete(':_id')
  async removeUser(@Param('_id') _id: string) {
    return await this.userService.removeUser(_id);
  }

  @Post('reset')
  async resetUserPassword(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return await this.userService.resetPassword(username, hash);
  }
}
