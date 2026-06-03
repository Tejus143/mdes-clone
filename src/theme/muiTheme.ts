import { createTheme } from '@mui/material/styles';

export const getAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#3fc4cf' : '#005f73' },
      secondary: { main: darkMode ? '#ffb703' : '#ca6702' },
      background: {
        default: darkMode ? '#0f1720' : '#f4f8fb',
        paper: darkMode ? '#152433' : '#ffffff',
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: 'Manrope, Segoe UI, sans-serif',
      h4: { fontFamily: 'Fraunces, serif', fontWeight: 700 },
      h5: { fontFamily: 'Fraunces, serif', fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
  });
