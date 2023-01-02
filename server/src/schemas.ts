import { Schema } from 'mongoose';
import { Question } from './types';
export const questionSchema = new Schema<Question>(
  {
    label: {
      type: String,
      required: true,
    },
    answers: {
      type: Map,
      required: true,
    },
    votes: {
      type: Map,
      required: true,
    },
    access: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
);
