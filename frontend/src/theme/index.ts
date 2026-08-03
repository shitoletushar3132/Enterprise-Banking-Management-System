import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0B3A53',
      light: '#1A5A7A',
      dark: '#062636',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C4A35A',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#F5F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#12263A',
      secondary: '#5B6B7C',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"IBM Plex Serif", Georgia, serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"IBM Plex Serif", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"IBM Plex Serif", Georgia, serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
