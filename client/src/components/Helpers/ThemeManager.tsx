import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { constants } from '../../constants';
import { uiThemeSelectedState, uiThemeState } from '../../state/uiState';

interface Props {
  children: React.ReactNode;
}

export const ThemeManager = ({ children }: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const uiTheme = useRecoilValue(uiThemeState);
  const [uiThemeSelected, setUiThemeSelected] =
    useRecoilState(uiThemeSelectedState);

  useEffect(() => {
    let mode: PaletteMode = 'light';
    switch (uiTheme) {
      case 'dark':
        mode = 'dark';
        break;
      case 'light':
        mode = 'light';
        break;
      case 'system':
        mode = prefersDarkMode ? 'dark' : 'light';
        break;
    }
    setUiThemeSelected(mode);
  }, [uiTheme, prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: uiThemeSelected,
          primary: {
            main: constants.colors.primary,
          },
        },
      }),
    [uiThemeSelected],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
