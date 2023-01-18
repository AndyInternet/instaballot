import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  handleConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  open,
  setOpen,
  title,
  message,
  cancelText,
  confirmText,
  handleConfirm,
}: Props) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
          <Button onClick={handleConfirm} color='primary' variant='contained'>
            {confirmText ? confirmText : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
