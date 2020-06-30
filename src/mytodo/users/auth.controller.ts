import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { UserInterface, User } from './user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const getUser = await this.userService.userModel
      .findOne({ username })
      .populate('categories')
      .populate({
        path: 'todos',
        match: { deleted: false },
        populate: {
          path: 'category',
        },
      });
    const user: UserInterface = { ...getUser.toJSON() };
    const checked = bcrypt.compareSync(password, user.password);
    if (!checked) {
      throw new UnauthorizedException('wrong password');
    } else {
      return {
        ...user,
        token: this.authService.genToken(user),
      };
    }
  }
}
