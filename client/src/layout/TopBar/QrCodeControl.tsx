import { Box, FormHelperText, Slider, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isMobileState,
  uiQrCodeSizeState,
  uiQrCodeState,
} from '../../state/uiState';

export const QrCodeControl = () => {
  const isMobile = useRecoilValue(isMobileState);
  const [qrCodeEnabled, setQrCodeEnabled] = useRecoilState(uiQrCodeState);
  const [qrCodeSize, setQrCodeSize] = useRecoilState(uiQrCodeSizeState);

  const handleSizeChange = (event: Event, newValue: number | number[]) => {
    setQrCodeSize(newValue as number);
  };

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
        QR Code
      </Typography>
      {isMobile ? (
        <FormHelperText>Not available on mobile</FormHelperText>
      ) : (
        <>
          <Switch
            checked={qrCodeEnabled}
            onChange={() => setQrCodeEnabled(!qrCodeEnabled)}
          />
          {qrCodeEnabled && (
            <>
              <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
                Size
              </Typography>
              <Box sx={{ padding: '0 16px' }}>
                <Slider
                  value={qrCodeSize}
                  onChange={handleSizeChange}
                  valueLabelDisplay='auto'
                  step={32}
                  marks
                  min={64}
                  max={512}
                />
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};
