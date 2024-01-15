import { PaletteMode, alpha } from '@mui/material';
import { blueGrey} from '@mui/material/colors';


const grey = blueGrey;

const black = '#111827';


const success  = {
  main: '#00E396'
};

const info = {
  main: '#008FFB',
};

const warning  = {
  main: '#FEB019'
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
    main: '#FF4560',
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
    main: '#7FF2CE',
  },
  error: {
    main: '#FF938F',
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
    default: '#24292e',
    paper: '#2f363d',
  },
};

const modes = { dark, light };

type Mode = {
  light: string,
  dark: string
}

const palette = (mode: PaletteMode) => ({
  mode,
  black,
  grey,
  info,
  success,
  warning,
  carbs,
  protein,
  fat,
  ...modes[mode as keyof Mode],
});

export default palette;
