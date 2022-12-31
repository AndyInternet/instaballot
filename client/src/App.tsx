import { Container, Typography } from '@mui/material';
import { Init } from './helpers/Init';
import { ThemeManager } from './helpers/ThemeManager';

export const App = () => {
  return (
    <>
      <Init />
      <ThemeManager>
        <Container>
          <Typography variant='h1'>hi</Typography>
        </Container>
      </ThemeManager>
    </>
  );
};
