// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colors.background.default,
      paper: colors.background.paper
    },
    primary: {
      main: colors.primary,
      contrastText: '#ffffff'
    },
    secondary: {
      main: colors.secondary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary
    },
    grey: colors.grey
  },
  shape: {
    borderRadius: 12
  },
  typography: {
  fontFamily: '"Poppins", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 15,
    h1: {
      fontWeight: 700,
      fontSize: '2.2rem',
      lineHeight: 1.3
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.35
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.7
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.5px'
    }
  },
  components: {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: colors.background.default,
        backgroundImage: `url('/images/blue_background_graphic.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
      }
    }
  },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: colors.background.tableHeader,
          fontWeight: 600,
          color: colors.text.primary,
          fontSize: '0.9rem'
        },
        body: {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: colors.background.rowAlternate
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 4px rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.input
        }
      }
    }
  }
});

export default theme;
