import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CustomRequest<T = any> extends Request {
  body: T;
  fingerprint?: string;
}

export interface CustomResponse extends Response {
  body?: JSON;
}
