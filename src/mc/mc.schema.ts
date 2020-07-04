import { Schema, Document } from 'mongoose';

export class MCUsers extends Document {
  constructor(
    private readonly username: string,
    private readonly socketID: string,
    private readonly isOnline: boolean,
    private readonly date: string,
  ) {
    super();
  }
}

export interface MCUsersInterface {
  _id: string;
  username: string;
  socketID: string;
  isOnline: boolean;
  date: string;
}

export const MCUsersSchema = new Schema({
  username: String,
  socketID: {
    type: String,
    default: '',
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
