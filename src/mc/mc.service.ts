import { Injectable } from '@nestjs/common';
import { MCUsers, MCUsersInterface } from './mc.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class McService {
  constructor(
    @InjectModel('mc_users') public readonly mcUsersModel: Model<MCUsers>,
  ) {}

  GetUsers(query = {}) {
    return this.mcUsersModel.find(query);
  }

  async CreateUser(user: MCUsersInterface) {
    const checkUser = await this.mcUsersModel.findOne({
      username: user.username,
    });
    if (checkUser) {
      throw new Error('Username already exist...');
    }
    return this.mcUsersModel.create(user);
  }

  UpdateUser(user: MCUsersInterface) {
    return this.mcUsersModel.updateOne({ _id: user._id }, user);
  }

  RemoveUser(_id: string) {
    return this.mcUsersModel.remove({ _id });
  }
}
