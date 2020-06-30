import { Schema, Document } from 'mongoose';

export class Category extends Document {
  constructor(
    private readonly name: string,
    private readonly color: string,
    private readonly user: string,
    private readonly date: string,
    private readonly _default: boolean,
  ) {
    super();
  }
}

export interface CategoryInterface {
  _id: string;
  name: string;
  color: string;
  user: string;
  date: string;
  _default: boolean;
}

export const CategorySchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#',
  },
  user: {
    type: String,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  _default: {
    type: Boolean,
    default: false,
  },
});
