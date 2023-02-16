import { Box } from '@mui/material';
import QRCode from 'react-qr-code';
import { useRecoilValue } from 'recoil';
import {
  uiQrCodeSizeState,
  uiQrCodeState,
  uiThemeSelectedState,
} from '../../state/uiState';

export const QrCode = () => {
  const showQrCode = useRecoilValue(uiQrCodeState);
  const qrCodeSize = useRecoilValue(uiQrCodeSizeState);
  const uiTheme = useRecoilValue(uiThemeSelectedState);
  const value = window.location.href;
  const bgColor = uiTheme === 'dark' ? '#000000' : '#ffffff';
  const fgColor = uiTheme === 'dark' ? '#ffffff' : '#000000';
  console.log(value);

  if (!showQrCode) return null;

  return (
    <Box>
      <QRCode
        size={qrCodeSize}
        style={{ height: 'auto', maxWidth: `${qrCodeSize}px`, width: '100%' }}
        value={value}
        viewBox={`0 0 ${qrCodeSize} ${qrCodeSize}`}
        fgColor={fgColor}
        bgColor={bgColor}
      />
    </Box>
  );
};
