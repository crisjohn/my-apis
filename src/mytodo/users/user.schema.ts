import { Schema, Document } from 'mongoose';

export class User extends Document {
  constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly categories: Array<string>,
    private readonly todos: Array<string>,
    private readonly date: string,
  ) {
    super();
  }
}

export interface UserInterface {
  _id: string;
  username: string;
  password: string;
  categories: Array<string>;
  todos: Array<string>;
  date: string;
}

export const UserSchema = new Schema({
  username: String,
  password: String,
  categories: [
    {
      type: String,
      ref: 'categories',
    },
  ],
  todos: [
    {
      type: String,
      ref: 'todos',
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});
