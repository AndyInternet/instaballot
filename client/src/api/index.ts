import {
  ApiQuery,
  CreateQuestionRequest,
  EmptyRequest,
  VoteRequest,
} from '../types/apiTypes';

export const fetchAll: ApiQuery<EmptyRequest> = {
  action: 'GET',
  endpoint: '/',
};

export const readQuestion = (id: string): ApiQuery<EmptyRequest> => {
  return {
    action: 'GET',
    endpoint: `/question/${id}`,
  };
};

export const removeQuestion = (id: string): ApiQuery<EmptyRequest> => {
  return {
    action: 'DELETE',
    endpoint: `/question/${id}`,
  };
};

export const createQuestionRequest = (
  payload: CreateQuestionRequest,
): ApiQuery<CreateQuestionRequest> => {
  return {
    action: 'POST',
    endpoint: '/question',
    payload: payload,
  };
};

export const voteRequest = (payload: VoteRequest): ApiQuery<VoteRequest> => {
  return {
    action: 'POST',
    endpoint: '/vote',
    payload: payload,
  };
};
