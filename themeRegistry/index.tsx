'use client';

import { PropsWithChildren, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { Inter } from 'next/font/google';
import type {} from '@mui/x-data-grid/themeAugmentation';
import palette from './palette';
import typography from './typography';
import components from './components';

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
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    carbs: PaletteOptions['primary'];
    fat: PaletteOptions['primary'];
    protein: PaletteOptions['primary'];
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    carbs: true;
    protein: true;
    fat: true;
  }
}

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides {
    carbs: true;
    protein: true;
    fat: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

const ThemeRegistry = ({ children }: PropsWithChildren): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = createTheme();

  theme = useMemo(
    () =>
      createTheme({
        palette: palette(prefersDarkMode ? 'dark' : 'light'),
        typography: typography(theme),
        components,
        shape: {
          borderRadius: 8,
        },
      }),
    [prefersDarkMode],
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeRegistry;
