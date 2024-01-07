import { Inter } from 'next/font/google';
import { alpha, createTheme } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import palette from './palette';

const inter = Inter({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

declare module '@mui/material/styles' {
  interface Palette {
    carbs: Palette['primary'];
    fat: Palette['primary'];
    protein: Palette['primary'];
  }
  interface PaletteOptions {
    carbs: PaletteOptions['primary'];
    fat: PaletteOptions['primary'];
    protein: PaletteOptions['primary'];
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    carbs: true;
    protein: true;
    fat: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
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
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'soft' &&
            ownerState.color !== 'inherit' &&
            ownerState.color !== undefined && {
              color: theme.palette[ownerState.color].main,
              backgroundColor: alpha(
                theme.palette[ownerState.color].main,
                0.12,
              ),
              '&:hover': {
                backgroundColor: alpha(
                  theme.palette[ownerState.color].main,
                  0.18,
                ),
              },
            }),
        }),
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
