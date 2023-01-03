import cookie from 'cookie';

export const getFingerprint = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies['fingerprint'] ? cookies['fingerprint'] : null;
};
