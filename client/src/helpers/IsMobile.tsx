import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isMobileState } from '../state/uiState';

export const IsMobile = () => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const checkIsMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (isMobile !== checkIsMobile) setIsMobile(checkIsMobile);
  }, [checkIsMobile, isMobile]);

  return null;
};
