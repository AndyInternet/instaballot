import { useEffect } from 'react';
import { load } from '../api';
import { useAxios } from '../hooks/useAxios';
import { EmptyRequest, LoadResponse } from '../types/apiTypes';

export const Init = () => {
  const client = useAxios();

  useEffect(() => {
    const init = async () => {
      const result = await client<EmptyRequest, LoadResponse>(load);
      // TODO load initial data here
    };
    init();
  }, [client]);
  return null;
};
