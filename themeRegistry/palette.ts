import { PaletteMode, alpha } from '@mui/material';
import { blueGrey, deepPurple, teal, green, amber, lightBlue, pink, cyan } from '@mui/material/colors';


const mode = 'dark' as PaletteMode;

const grey = blueGrey;

export const primary = deepPurple;
export const secondary = teal;
export const error = pink;

const info = {
  main: lightBlue[500],
};

const success  = {
  main: green[500]
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
    main: primary[400],
  },
  secondary: {
    main: secondary[500],
  },
  error: {
    main: error[500],
  },
  text: {
    primary: grey[800],
    secondary: grey[600],
  },
  action: {
    active: alpha(grey[800], 0.54),
    disabled: alpha(grey[800], 0.26),
    disabledBackground: alpha(grey[800], 0.08),
    focus: alpha(grey[800], 0.12),
    hover: alpha(grey[800], 0.04),
    selected: alpha(grey[800], 0.08),
  },
  background: {
    default: grey[50],
  },
};

const dark = {
  primary: {
    main: primary[200],
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
    default: grey[900],
    paper: grey[900],
  },
};

const modes = { dark, light };

const palette = {
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
