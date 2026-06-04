import { createTheme } from '@mui/material/styles';

const navy = '#071f3d';
const orange = '#f36b2b';

export const getAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#f7f3e9' : navy },
      secondary: { main: darkMode ? '#ff8a50' : orange },
      background: {
        default: darkMode ? '#071525' : '#fbfaf7',
        paper: darkMode ? '#0d2138' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f7f3e9' : '#122238',
        secondary: darkMode ? '#c0cad5' : '#667282',
      },
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: '"DM Sans", "Segoe UI", sans-serif',
      h1: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 0.98 },
      h2: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 1.02 },
      h3: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 1.08 },
      h4: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 1.12 },
      h5: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600 },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700, letterSpacing: 0.8 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: darkMode ? '#071525' : '#fbfaf7',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            borderRadius: 0,
            minHeight: 46,
            paddingInline: 24,
            fontSize: '0.72rem',
            transition: 'all 180ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
          containedSecondary: {
            color: navy,
          },
          containedPrimary: {
            color: darkMode ? navy : '#ffffff',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: darkMode ? '1px solid rgba(231,201,142,.16)' : '1px solid #ece8df',
            backgroundImage: 'none',
            boxShadow: '0 14px 40px rgba(7,31,61,.07)',
            transition: 'transform 220ms ease, box-shadow 220ms ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 22px 50px rgba(7,31,61,.13)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? '#071525' : '#ffffff',
            color: darkMode ? '#f7f3e9' : navy,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
    },
  });
