import { atom } from 'recoil';
import { UiTheme, UiThemeSelected } from '../types/uiTypes';

export const isMobileState = atom<boolean>({
  key: 'isMobile',
  default: true,
});

export const uiThemeState = atom<UiTheme>({
  key: 'uiTheme',
  default: 'system',
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'uiThemeState';
      const uiTheme = localStorage.getItem(key) as UiTheme;
      if (uiTheme) {
        setSelf(uiTheme);
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, newValue || '');
      });
    },
  ],
});

export const uiThemeSelectedState = atom<UiThemeSelected>({
  key: 'uiThemeSelected',
  default: 'dark',
});

export const uiQrCodeState = atom<boolean>({
  key: 'uiQrCode',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'uiQrCodeState';
      const uiQrEnabled = localStorage.getItem(key) as string;
      if (uiQrEnabled) {
        setSelf(Boolean(uiQrEnabled === 'true'));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, newValue ? 'true' : 'false');
      });
    },
  ],
});

export const uiQrCodeSizeState = atom<number>({
  key: 'uiQrCodeSize',
  default: 128,
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'uiQrCodeSize';
      const uiQrSize = localStorage.getItem(key) as string;
      if (uiQrSize) {
        setSelf(Number(uiQrSize));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, newValue.toString());
      });
    },
  ],
});
