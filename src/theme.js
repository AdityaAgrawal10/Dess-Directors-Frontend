// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // a modern blue
    },
    secondary: {
      main: '#9c27b0', // a complementary purple
    },
    background: {
      default: '#f5f5f5', // light background for a clean look
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    // Example: override button styles globally
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable uppercase
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
