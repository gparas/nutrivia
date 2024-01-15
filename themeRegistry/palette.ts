import { PaletteMode, alpha } from '@mui/material';
import { blueGrey, deepPurple, teal, green, amber, lightBlue, pink, cyan } from '@mui/material/colors';


const mode = 'light' as PaletteMode;

const grey = blueGrey;

export const primary = deepPurple;
export const secondary = teal;
export const error = pink;

const black = '#111827';

const info = {
  main: lightBlue[500],
};

const success  = {
  main: '#22c55e'
};

const warning  = {
  main: amber[500]
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

const light = {
  primary: {
    main: '#8b5cf6',
    dark: '#6d28d9'
  },
  secondary: {
    main: '#2dd4bf',
  },
  error: {
    main: error[500],
  },
  text: {
    primary: black,
    secondary: '#6b7280',
  },
  action: {
    active: alpha(black, 0.54),
    disabled: alpha(black, 0.26),
    disabledBackground: alpha(black, 0.08),
    focus: alpha(black, 0.12),
    hover: alpha(black, 0.04),
    selected: alpha(black, 0.08),
  },
  background: {
    default: '#f9fafb',
  },
};

const dark = {
  primary: {
    main: '#c4b5fd',
  },
  secondary: {
    main: secondary[300],
  },
  error: {
    main: pink[300],
  },
  text: {
    secondary: alpha('#ffffff', 0.54),
  },
  action: {
    active: alpha('#ffffff', 0.54),
    disabled: alpha('#ffffff', 0.26),
    disabledBackground: alpha('#ffffff', 0.08),
    focus: alpha('#ffffff', 0.12),
    hover: alpha('#ffffff', 0.04),
    selected: alpha('#ffffff', 0.1),
  },
  background: {
    default: '#1f2937',
    paper: '#374151',
  },
};

const modes = { dark, light };

const palette = {
  black,
  grey,
  info,
  success,
  warning,
  mode,
  carbs,
  protein,
  fat,
  ...modes[mode],
};

export default palette;
