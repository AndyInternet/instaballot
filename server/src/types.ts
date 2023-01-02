import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CustomRequest<T = any> extends Request {
  body: T;
  fingerprint?: string;
}

export interface CustomResponse extends Response {
  body?: JSON;
}

export interface Answer {
  _id?: string;
  label: string;
}

export interface Vote {
  _id?: string;
  answerId: string;
  fingerprint: string;
}

export interface Question {
  _id?: string;
  label: string;
  answers: Answer[];
  votes: Vote[];
  access: string[];
}

export type EmptyRequest = undefined;

export interface CreateQuestionRequest {
  label: string;
  answers: string[];
}

export interface VoteRequest {
  questionId: string;
  answerId: string;
}
