import { atom } from 'recoil';

export const isMobileState = atom<boolean>({
  key: 'isMobile',
  default: true,
});
