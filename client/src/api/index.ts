import {
  ApiQuery,
  CreateQuestionRequest,
  EmptyRequest,
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
