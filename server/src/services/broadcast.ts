import { io } from '../app';
import { Question } from '../types';

export const broadcastQuestionUpdate = (question: Question) => {
  for (const fingerprint of question.access) {
    io.to(fingerprint).emit('question', question);
  }
};
