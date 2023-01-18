import {
  ContentCopy as ContentCopyIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
} from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { fingerprintState } from '../../state/fingerprintState';

export const FingerprintControl = () => {
  const navigate = useNavigate();
  const [fingerprint, setFingerprint] = useRecoilState(fingerprintState);
  const [isLocked, setIsLocked] = useState(true);
  const [editFingerprint, setEditFingerprint] = useState(fingerprint);

  const handleEditFingerprint = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setEditFingerprint(value.replace(/[^a-zA-Z0-9_-]+/g, ''));
  };

  const handleClick = () => {
    if (isLocked) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
      if (fingerprint !== editFingerprint) {
        if (editFingerprint.length < 2) {
          setEditFingerprint(fingerprint);
          toast('Fingerprint must be at least 2 characters', {
            type: 'error',
          });
        } else {
          setFingerprint(editFingerprint);
          toast('Fingerprint updated. App will reload in 5 seconds', {
            type: 'success',
          });
          navigate('/');
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      }
    }
  };

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
        Fingerprint
      </Typography>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='fingerprint-id'>Fingerprint</InputLabel>
        <OutlinedInput
          id='fingerprint-id'
          type='text'
          value={editFingerprint}
          onChange={handleEditFingerprint}
          disabled={isLocked}
          label='Fingerprint'
        />
      </FormControl>
      <Box sx={{ textAlign: 'right' }}>
        <IconButton onClick={handleClick}>
          {isLocked ? (
            <LockIcon fontSize='small' />
          ) : (
            <LockOpenIcon fontSize='small' />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            if (fingerprint) {
              navigator.clipboard.writeText(fingerprint);
              toast('Fingerprint copied to clipboard', {
                type: 'success',
              });
            }
          }}
        >
          <ContentCopyIcon fontSize='small' />
        </IconButton>
      </Box>
    </>
  );
};
