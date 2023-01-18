import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <Grid item>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button
          onClick={() => navigate('/')}
          startIcon={<CheckCircleOutlineIcon />}
          sx={{ color: '#fff' }}
        >
          Ballots
        </Button>
        <Button
          onClick={() => navigate('/new')}
          startIcon={<AddCircleOutlineIcon />}
          sx={{ color: '#fff' }}
        >
          New
        </Button>
        <Button
          onClick={() => navigate('/help')}
          startIcon={<HelpOutlineIcon />}
          sx={{ color: '#fff' }}
        >
          Help
        </Button>
      </Box>
    </Grid>
  );
};
