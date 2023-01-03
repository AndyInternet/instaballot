import { JSONSchemaType } from 'ajv';
import { CreateQuestionRequest, VoteRequest } from './types';

/**
 * createQuestionRequestSchema
 */
export const createQuestionRequestSchema: JSONSchemaType<CreateQuestionRequest> = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    expiresAt: {
      type: 'string',
      format: 'date',
    },
    answers: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['label', 'answers'],
};

/**
 * voteRequestSchema
 */
export const voteRequestSchema: JSONSchemaType<VoteRequest> = {
  type: 'object',
  properties: {
    questionId: {
      type: 'string',
    },
    answerId: {
      type: 'string',
    },
  },
  required: ['questionId', 'answerId'],
};
