import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

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
      100: '#FAF8FF',
      300: '#ECE7FF',
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
      200: '#FFEDBD',
      main: '#ffbf5a',
    },
    error: {
      main: '#eb3478',
    },
    background: {
      default: '#F4F6F8',
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
    h3: {
      fontSize: theme.typography.pxToRem(32),
    },
    h4: {
      fontSize: theme.typography.pxToRem(24),
    },
    h5: {
      fontSize: theme.typography.pxToRem(20),
    },
    h6: {
      fontSize: theme.typography.pxToRem(18),
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
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: theme.shape.borderRadius,
          },
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
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;
