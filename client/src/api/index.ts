import { ApiQuery, EmptyRequest } from '../types/apiTypes';

export const load: ApiQuery<EmptyRequest> = {
  action: 'GET',
  endpoint: '/',
};
