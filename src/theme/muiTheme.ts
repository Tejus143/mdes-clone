import { createTheme } from '@mui/material/styles';

export const getAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#6ec1ff' : '#0d3b78' },
      secondary: { main: darkMode ? '#ffb28a' : '#f15a25' },
      background: {
        default: darkMode ? '#0b1425' : '#f4f1eb',
        paper: darkMode ? '#111f36' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f3f6fb' : '#11233f',
        secondary: darkMode ? '#b7c5db' : '#5a6a83',
      },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: 'Sora, Segoe UI, sans-serif',
      h4: { fontFamily: 'Bitter, serif', fontWeight: 700, letterSpacing: 0.2 },
      h5: { fontFamily: 'Bitter, serif', fontWeight: 700, letterSpacing: 0.2 },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700, letterSpacing: 0.2 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: darkMode
              ? 'radial-gradient(circle at 20% 0%, rgba(110,193,255,0.16), transparent 44%), radial-gradient(circle at 90% 10%, rgba(241,90,37,0.14), transparent 46%), linear-gradient(180deg, #091327 0%, #0b1425 100%)'
              : 'radial-gradient(circle at 10% 0%, rgba(13,59,120,0.08), transparent 42%), radial-gradient(circle at 90% 10%, rgba(241,90,37,0.1), transparent 50%), linear-gradient(180deg, #f7f3ec 0%, #f0f5fb 100%)',
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 999,
            paddingInline: 18,
            transition: 'transform 160ms ease, box-shadow 200ms ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: darkMode
                ? '0 8px 20px rgba(0, 0, 0, 0.35)'
                : '0 10px 24px rgba(18, 39, 71, 0.18)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: darkMode ? '1px solid rgba(156, 190, 255, 0.16)' : '1px solid rgba(17, 35, 63, 0.08)',
            background: darkMode ? 'linear-gradient(180deg, #12233b 0%, #101d31 100%)' : '#ffffffcc',
            backdropFilter: 'blur(8px)',
            boxShadow: darkMode
              ? '0 12px 26px rgba(0, 0, 0, 0.32)'
              : '0 14px 30px rgba(13, 30, 58, 0.09)',
            transition: 'transform 170ms ease, box-shadow 220ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode
                ? '0 16px 30px rgba(0, 0, 0, 0.4)'
                : '0 18px 34px rgba(13, 30, 58, 0.14)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: darkMode
              ? 'linear-gradient(90deg, rgba(9,20,39,0.95), rgba(13,35,67,0.9))'
              : 'linear-gradient(90deg, rgba(10,34,66,0.94), rgba(15,59,113,0.9))',
            borderBottom: darkMode
              ? '1px solid rgba(147, 183, 255, 0.2)'
              : '1px solid rgba(236, 242, 255, 0.32)',
          },
        },
      },
    },
  });
