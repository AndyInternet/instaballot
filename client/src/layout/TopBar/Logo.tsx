import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export const Logo = () => {
  const navigate = useNavigate();

  return (
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
  );
};
