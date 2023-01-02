import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { isMobileState } from '../state/uiState';

export const TopBar = () => {
  const navigate = useNavigate();
  const isMobile = useRecoilValue(isMobileState);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Box display='flex' alignItems='center'>
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
            {!isMobile && (
              <Grid item>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Button
                    onClick={() => navigate('/')}
                    startIcon={<CheckCircleOutlineIcon />}
                  >
                    Ballots
                  </Button>
                  <Button
                    onClick={() => navigate('/New')}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    New
                  </Button>
                  <Button
                    onClick={() => navigate('/Help')}
                    startIcon={<HelpOutlineIcon />}
                  >
                    Help
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
