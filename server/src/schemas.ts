import { Schema } from 'mongoose';
import { Question } from './types';

/**
 * questionSchema
 */
export const questionSchema = new Schema<Question>(
  {
    label: {
      type: String,
      required: true,
    },
    answers: [
      {
        label: { type: String, required: true },
      },
    ],
    votes: [
      {
        answerId: { type: String, required: true },
        fingerprint: { type: String, required: true },
      },
    ],
    access: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
);
