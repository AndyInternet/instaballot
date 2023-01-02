import { JSONSchemaType } from 'ajv';
import { CreateQuestionRequest } from './types';

export const createQuestionRequestSchema: JSONSchemaType<CreateQuestionRequest> = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
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
