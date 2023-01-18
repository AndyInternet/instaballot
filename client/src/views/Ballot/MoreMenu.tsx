import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { removeQuestion } from '../../api';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useAxios } from '../../hooks/useAxios';
import { activeQuestionIdState } from '../../state/questionState';
import { EmptyRequest, IdResponse } from '../../types/apiTypes';

export const MoreMenu = () => {
  const client = useAxios();
  const navigate = useNavigate();
  const [activeQuestionId, setActiveQuestionId] = useRecoilState(
    activeQuestionIdState,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (activeQuestionId) {
      const result = await client<EmptyRequest, IdResponse>(
        removeQuestion(activeQuestionId),
      );
      if (result) {
        navigate('/');
      }
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon color='primary' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleConfirmDialogOpen}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2' color='text.secondary'>
            Remove
          </Typography>
        </MenuItem>
      </Menu>
      <ConfirmDialog
        title='Remove Ballot?'
        message='Are you sure you want to remove this ballot?'
        handleConfirm={handleConfirm}
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        confirmText='Remove'
      />
    </>
  );
};
