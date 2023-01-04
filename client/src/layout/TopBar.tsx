import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ContentCopy as ContentCopyIcon,
  HelpOutline as HelpOutlineIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InstaBallotDivider } from '../components/InstaBallotDivider';
import { constants } from '../constants';
import { fingerprintState } from '../state/fingerprintState';
import {
  isMobileState,
  uiThemeSelectedState,
  uiThemeState,
} from '../state/uiState';

export const TopBar = () => {
  const navigate = useNavigate();
  const isMobile = useRecoilValue(isMobileState);
  const fingerprint = useRecoilValue(fingerprintState);
  const [uiTheme, setUiTheme] = useRecoilState(uiThemeState);
  const uiThemeSelected = useRecoilValue(uiThemeSelectedState);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
                {!isMobile && (
                  <Grid item>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Button
                        onClick={() => navigate('/')}
                        startIcon={<CheckCircleOutlineIcon />}
                        sx={{
                          color:
                            uiThemeSelected === 'dark'
                              ? constants.colors.primary
                              : '#fff',
                        }}
                      >
                        Ballots
                      </Button>
                      <Button
                        onClick={() => navigate('/new')}
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                          color:
                            uiThemeSelected === 'dark'
                              ? constants.colors.primary
                              : '#fff',
                        }}
                      >
                        New
                      </Button>
                      <Button
                        onClick={() => navigate('/help')}
                        startIcon={<HelpOutlineIcon />}
                        sx={{
                          color:
                            uiThemeSelected === 'dark'
                              ? constants.colors.primary
                              : '#fff',
                        }}
                      >
                        Help
                      </Button>
                    </Box>
                  </Grid>
                )}
                <Grid item>
                  <IconButton onClick={handleClick}>
                    <SettingsIcon
                      sx={{
                        color:
                          uiThemeSelected === 'dark'
                            ? constants.colors.primary
                            : '#fff',
                      }}
                    />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Box sx={{ padding: '16px', minWidth: '320px' }}>
                      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
                        Fingerprint
                      </Typography>
                      <FormControl sx={{ width: '100%' }} variant='outlined'>
                        <InputLabel htmlFor='fingerprint-id'>
                          Fingerprint
                        </InputLabel>
                        <OutlinedInput
                          id='fingerprint-id'
                          type='text'
                          defaultValue={fingerprint}
                          disabled
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='fingerprint'
                                onClick={() => {
                                  if (fingerprint) {
                                    navigator.clipboard.writeText(fingerprint);
                                    toast('Fingerprint copied to clipboard', {
                                      type: 'success',
                                    });
                                  }
                                }}
                                edge='end'
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label='Fingerprint'
                        />
                      </FormControl>
                      <InstaBallotDivider />
                      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
                        Theme
                      </Typography>
                      <ButtonGroup
                        fullWidth
                        variant='outlined'
                        aria-label='light / dark mode'
                      >
                        <Button
                          variant={
                            uiTheme === 'light' ? 'contained' : 'outlined'
                          }
                          onClick={() => setUiTheme('light')}
                        >
                          Light
                        </Button>
                        <Button
                          variant={
                            uiTheme === 'dark' ? 'contained' : 'outlined'
                          }
                          onClick={() => setUiTheme('dark')}
                        >
                          Dark
                        </Button>
                        <Button
                          variant={
                            uiTheme === 'system' ? 'contained' : 'outlined'
                          }
                          onClick={() => setUiTheme('system')}
                        >
                          System
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Popover>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
