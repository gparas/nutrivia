import { Theme } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
});

const typography = (theme: Theme) => ({
  fontFamily: [inter.style.fontFamily, 'sans-serif'].join(','),
  button: {
    fontWeight: 700,
    textTransform: 'initial' as const
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
});

export default typography;
