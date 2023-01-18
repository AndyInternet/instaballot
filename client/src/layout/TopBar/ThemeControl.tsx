import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { uiThemeState } from '../../state/uiState';

export const ThemeControl = () => {
  const [uiTheme, setUiTheme] = useRecoilState(uiThemeState);

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
        Theme
      </Typography>
      <ButtonGroup fullWidth variant='outlined' aria-label='light / dark mode'>
        <Button
          variant={uiTheme === 'light' ? 'contained' : 'outlined'}
          onClick={() => setUiTheme('light')}
        >
          Light
        </Button>
        <Button
          variant={uiTheme === 'dark' ? 'contained' : 'outlined'}
          onClick={() => setUiTheme('dark')}
        >
          Dark
        </Button>
        <Button
          variant={uiTheme === 'system' ? 'contained' : 'outlined'}
          onClick={() => setUiTheme('system')}
        >
          System
        </Button>
      </ButtonGroup>
    </>
  );
};
