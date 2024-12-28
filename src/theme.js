import { createTheme } from '@mui/material';

export const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#646cff',
    },
    background: {
      default: darkMode ? '#242424' : '#f5f5f5',
      paper: darkMode ? '#1a1a1a' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
