import { Inter } from 'next/font/google';
import { alpha, createTheme } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import palette from './palette';

const inter = Inter({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    carbs: true;
    protein: true;
    fat: true;
  }
}

let theme = createTheme();

theme = createTheme({
  palette,
  shape: {
    borderRadius: 8,
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
    MuiDivider: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.light && {
            borderColor: alpha(theme.palette.divider, 0.5),
          }),
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
