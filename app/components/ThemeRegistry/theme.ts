import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

let theme = createTheme();

theme = createTheme({
  palette: {
    mode: 'light',
    grey: {
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
    },
    primary: {
      main: '#7b66ff',
    },
    secondary: {
      main: '#c3de0a',
    },
    info: {
      main: '#5ecfcd',
    },
    success: {
      main: '#22C55E',
    },
    warning: {
      main: '#ffbf5a',
    },
    error: {
      main: '#eb3478',
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    button: {
      fontWeight: 700,
      textTransform: 'initial',
    },
    h4: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
