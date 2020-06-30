import { Document, Schema } from 'mongoose';

export class Todo extends Document {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly category: string,
    private readonly user: string,
    private readonly date: string,
    private readonly completed: boolean,
    private readonly deleted: boolean,
    private readonly checked: boolean,
    private readonly pinToTop: boolean,
  ) {
    super();
  }
}

export interface TodoInterface {
  _id: string;
  title: string;
  description: string;
  category: string;
  user: string;
  date: string;
  completed: boolean;
  deleted: boolean;
  checked: boolean;
  pinToTop: boolean;
}

export const TodoSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    ref: 'categories',
  },
  user: {
    type: String,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  pinToTop: {
    type: Boolean,
    default: false,
  },
});
