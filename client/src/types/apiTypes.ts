export interface ApiQuery<T> {
  action: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  payload?: T;
}

export type EmptyRequest = undefined;

export type LoadResponse = { message: string };
