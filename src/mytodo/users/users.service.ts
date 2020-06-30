import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserInterface } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') readonly userModel: Model<User>) {}

  async getUser(query = {}): Promise<Array<User>> {
    return this.userModel.find(query);
  }

  async createUser(user: UserInterface): Promise<User> {
    return this.userModel.create(user);
  }

  async updateUser(user: UserInterface): Promise<User> {
    return this.userModel.updateOne({ _id: user._id }, user);
  }

  async removeUser(_id: string): Promise<{}> {
    return this.userModel.remove({ _id });
  }

  async resetPassword(username: string, hash: string) {
    return this.userModel.updateOne({ username }, { password: hash });
  }
}
