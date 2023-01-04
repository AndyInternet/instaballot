import { atom } from 'recoil';

export const fingerprintState = atom<string | null>({
  key: 'fingerprintState',
  default: null,
});
