import { atom } from 'recoil';
import { NetworkState } from '../types/apiTypes';

export const networkState = atom<NetworkState>({
  key: 'apiNetwork',
  default: 'idle',
});
