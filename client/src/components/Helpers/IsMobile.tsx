import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isMobileState, uiQrCodeState } from '../../state/uiState';

export const IsMobile = () => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const checkIsMobile = useMediaQuery('(max-width:600px)');
  const setQrCodeEnabled = useSetRecoilState(uiQrCodeState);

  useEffect(() => {
    if (isMobile !== checkIsMobile) setIsMobile(checkIsMobile);
  }, [checkIsMobile, isMobile]);

  return null;
};
