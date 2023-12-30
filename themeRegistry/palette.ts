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

const secondary = {
  main: '#c3de0a',
};

const carbs = {
  main: '#5ecfcd',
};

const protein = {
  main: '#eb3478',
};

const fat = {
  main: '#ffbf5a',
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
  primary: {
    main: '#7E57C2',
  },
  text: {
    primary: '#212B36',
    secondary: '#637381',
  },
  divider: grey[300],
  background: {
    default: '#f6f8fa',
    primary: '#7E57C2',
  },
};

const dark = {
  primary: {
    main: '#B39DDB',
  },
  divider: '#444d56',
  background: {
    default: '#24292e',
    paper: '#2f363d',
    primary: '#7E57C2',
  },
};

const modes = { dark, light };

const palette = {
  error,
  grey,
  info,
  mode,
  secondary,
  success,
  warning,
  carbs,
  protein,
  fat,
  ...modes[mode],
};

export default palette;
