// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 330,    // Override default 0
      sm: 786,    // Override default 600
      md: 1280,   // Keep default
      lg: 1440,   // Optional
      xl: 1920,   // Optional
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
