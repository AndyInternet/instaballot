import { atom } from 'recoil';

export const networkState = atom<'idle' | 'active'>({
  key: 'apiNetwork',
  default: 'idle',
});
