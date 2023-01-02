import mongoose from 'mongoose';
import { questionSchema } from './schemas';

export const Question = mongoose.model('Question', questionSchema);
