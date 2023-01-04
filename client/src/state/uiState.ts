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
