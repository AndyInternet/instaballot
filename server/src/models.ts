import mongoose from 'mongoose';
import { questionSchema } from './schemas';

/**
 * Question model
 */
export const Question = mongoose.model('Question', questionSchema);
