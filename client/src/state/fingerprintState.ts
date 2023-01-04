import { atom } from 'recoil';
import { v4 } from 'uuid';

export const fingerprintState = atom<string>({
  key: 'fingerprintState',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'fingerprint';
      const fingerprint = localStorage.getItem(key);
      if (fingerprint) {
        setSelf(fingerprint);
      } else {
        const newFingerprint = v4();
        localStorage.setItem(key, newFingerprint);
        setSelf(newFingerprint);
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, newValue || '');
      });
    },
  ],
});
