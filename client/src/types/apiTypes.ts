import { Question } from './questionTypes';

export interface ApiQuery<T> {
  action: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  payload?: T;
}

export type NetworkState = 'idle' | 'active';

export type EmptyRequest = undefined;

export type QuestionsResponse = Question[];

export type QuestionResponse = Question;

export interface CreateQuestionRequest {
  label: string;
  expiresAt: string;
  answers: string[];
}

export interface VoteRequest {
  questionId: string;
  answerId: string;
}
