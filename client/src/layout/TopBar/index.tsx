import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isMobileState } from '../../state/uiState';
import { ExtraMenu } from './ExtraMenu';
import { Logo } from './Logo';
import { MainMenu } from './MainMenu';

export const TopBar = () => {
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
              <Logo />
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
