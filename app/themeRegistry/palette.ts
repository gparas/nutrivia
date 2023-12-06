import { PaletteMode } from '@mui/material';

const mode = 'light' as PaletteMode;

const grey = {
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const primary = {
  100: '#FAF8FF',
  300: '#ECE7FF',
  main: '#7b66ff',
};

const secondary = {
  main: '#c3de0a',
};

const info = {
  main: '#5ecfcd',
};

const success = {
  main: '#22C55E',
};

const warning = {
  200: '#FFEDBD',
  main: '#ffbf5a',
};

const error = {
  main: '#eb3478',
};

const light = {
  text: {
    primary: '#212B36',
    secondary: '#637381',
  },
  divider: grey[300],
  background: {
    default: '#f6f8fa',
  },
};

const dark = {
  divider: '#444d56',
  background: {
    default: '#24292e',
    paper: '#2f363d',
  },
};

const modes = { dark, light };

export default {
  error,
  grey,
  info,
  mode,
  primary,
  secondary,
  success,
  warning,
  ...modes[mode],
};
