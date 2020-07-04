import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { McService } from './mc.service';
import { MCUsersInterface } from './mc.schema';

@Controller('mc/v1/users')
export class McController {
  constructor(private readonly mcUsersService: McService) {}

  @Get()
  async GetUsers() {
    return await this.mcUsersService.GetUsers({});
  }

  @Get(':username')
  async GetUser(@Param('username') username: string) {
    const result = await await this.mcUsersService.GetUsers({ username });
    return result[0];
  }

  @Post()
  async CreateUser(@Body() user: MCUsersInterface) {
    return await this.mcUsersService.CreateUser(user);
  }

  @Put()
  async UpdateUser(@Body() user: MCUsersInterface) {
    return await this.mcUsersService.UpdateUser(user);
  }

  @Delete(':_id')
  async DelteUser(@Param('_id') _id: string) {
    return await this.mcUsersService.RemoveUser(_id);
  }
}
