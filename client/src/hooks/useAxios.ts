import axios, { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { networkState } from '../state/apiState';
import { fingerprintState } from '../state/fingerprintState';
import { ApiQuery } from '../types/apiTypes';

export const useAxios = (): (<T, R>({
  action,
  endpoint,
  payload,
}: ApiQuery<T>) => Promise<R | undefined>) => {
  const baseUrl = import.meta.env.VITE_SERVER_URL || '';
  const fingerprint = useRecoilValue(fingerprintState);
  const setNetworkState = useSetRecoilState(networkState);

  const client = async <T, R>({ action, endpoint, payload }: ApiQuery<T>) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        fingerprint: fingerprint,
      },
    });
    let result: AxiosResponse<R> | undefined;
    setNetworkState('active');
    try {
      switch (action) {
        case 'GET':
          result = await instance.get(endpoint);
          break;
        case 'POST':
          result = await instance.post(endpoint, payload);
          break;
        case 'PUT':
          result = await instance.put(endpoint, payload);
          break;
        case 'DELETE':
          result = await instance.delete(endpoint);
          break;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast(error?.message, { type: 'error' });
    }

    setNetworkState('idle');

    if (result?.data) return result.data as R;
    return undefined;
  };

  return useCallback(client, [baseUrl, setNetworkState]);
};
