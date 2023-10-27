import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b66ff'
    },
    secondary: {
      main: '#c3de08'
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;