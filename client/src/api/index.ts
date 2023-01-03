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
