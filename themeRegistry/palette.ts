import { PaletteMode, alpha } from '@mui/material';

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

const light = {
  primary: {
    main: '#7E57C2',
  },
  error: {
    main: '#E91E63',
  },
  text: {
    primary: grey[800],
    secondary: grey[600],
  },
  action: {
    active: alpha(grey[800], 0.54),
    disabled: alpha(grey[800], 0.26),
    disabledBackground: alpha(grey[800], 0.12),
    focus: alpha(grey[800], 0.12),
    hover: alpha(grey[800], 0.04),
    selected: alpha(grey[800], 0.08),
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
  error: {
    main: '#F48FB1',
  },
  divider: '#444d56',
  action: {
    active: alpha('#ffffff', 0.54),
    disabled: alpha('#ffffff', 0.26),
    disabledBackground: alpha('#ffffff', 0.12),
    focus: alpha('#ffffff', 0.12),
    hover: alpha('#ffffff', 0.04),
    selected: alpha('#ffffff', 0.1),
  },
  background: {
    default: '#24292e',
    paper: '#2f363d',
    primary: '#7E57C2',
  },
};

const modes = { dark, light };

const palette = {
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
