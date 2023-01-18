import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { isMobileState } from '../../state/uiState';
import { ExtraMenu } from './ExtraMenu';
import { MainMenu } from './MainMenu';

export const TopBar = () => {
  const navigate = useNavigate();
  const isMobile = useRecoilValue(isMobileState);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleExtraMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Box
                display='flex'
                alignItems='center'
                onClick={() => navigate('/')}
                sx={{ cursor: 'pointer' }}
              >
                <CheckCircleOutlineIcon />
                <Typography
                  variant='h6'
                  noWrap
                  sx={{
                    fontWeight: 700,
                    fontStyle: 'italic',
                    padding: '4px 8px',
                  }}
                >
                  instaballot
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                {!isMobile && <MainMenu />}
                <Grid item>
                  <IconButton onClick={handleExtraMenu}>
                    <MoreVertIcon
                      sx={{
                        color: '#fff',
                      }}
                    />
                  </IconButton>
                  <ExtraMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
