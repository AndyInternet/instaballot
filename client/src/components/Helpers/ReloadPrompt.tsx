import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.info('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(needRefresh);
  }, [needRefresh]);

  const handleClose = () => {
    setNeedRefresh(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='reload-prompt'
      aria-describedby='reload-description'
    >
      <DialogContent>
        <DialogContentText id='reload-description'>
          <Typography>
            New version available, click on reload button to update.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Close
        </Button>
        <Button variant='contained' onClick={() => updateServiceWorker(true)}>
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
