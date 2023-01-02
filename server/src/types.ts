import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CustomRequest<T = any> extends Request {
  body: T;
  fingerprint?: string;
}

export interface CustomResponse extends Response {
  body?: JSON;
}

export type Answers = Record<string, string>; // id, label
export type Votes = Record<string, string | null>; // fingerprint, answerId

export interface Question {
  label: string;
  answers: Answers;
  votes: Votes;
  access: string[];
}

export type EmptyRequest = undefined;

export interface CreateQuestionRequest {
  label: string;
  answers: string[];
}
