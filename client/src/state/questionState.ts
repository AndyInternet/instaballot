import { atom, selector } from 'recoil';
import { NetworkState } from '../types/apiTypes';
import { Question } from '../types/questionTypes';

export const questionsState = atom<Question[]>({
  key: 'questions',
  default: [],
});

export const activeQuestionIdState = atom<string | null>({
  key: 'activeQuestionId',
  default: null,
});

const selectActiveQuestion = selector({
  key: 'selectActiveQuestion',
  get: ({ get }) => {
    const questions = get(questionsState);
    const activeQuestionId = get(activeQuestionIdState);

    if (questions.length === 0 || !activeQuestionId) return null;

    const activeQuestion = questions.find(
      (question) => question._id === activeQuestionId,
    );
    return activeQuestion ? activeQuestion : null;
  },
});
