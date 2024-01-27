import { PaletteMode, alpha } from '@mui/material';
import violet from './violet';
import grey from './grey';


const common = {
  black: '#2a2e43'
}


const info = {
  main: '#008FFB',
};

const warning  = {
  main: '#FEB019'
};

const carbs = {
  main: '#775DD0',
};

const protein = {
  main: '#3bcde2',
};

const fat = {
  main: '#D857B9',
};

const light = {
  primary: {
    light: violet[100],
    main: violet[500],
  },
  secondary: {
    main: violet[500],
  },
  accent: {
    main: '#5CD0B7',
  },
  success: {
    main: '#16a34a',
  },
  error: {
    main: '#ef4444',
  },
  neutral: {
    main: '#eaebef',
  },
  text: {
    primary: common.black,
    secondary: '#6b7280',
  },
  action: {
    active: alpha(common.black, 0.54),
    disabled: alpha(common.black, 0.26),
    disabledBackground: alpha(common.black, 0.08),
    focus: alpha(common.black, 0.12),
    hover: alpha(common.black, 0.04),
    selected: alpha(common.black, 0.08),
  },
  background: {
    default: grey[200],
  },
};

const dark = {
  primary: {
    light: violet[200],
    main: violet[500],
  },
  secondary: {
    main: violet[300],
  },
  accent: {
    main: '#7FF2CE',
  },
  success: {
    main: '#4ade80',
  },
  error: {
    main: '#fb7185',
  },
  neutral: {
    main: '#454f63',
  },
  text: {
    secondary: '#78849e',
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
    default: '#2a2e43',
    paper: '#353a50',
  },
};

const modes = { dark, light };

type Mode = {
  light: string,
  dark: string
}

const palette = (mode: PaletteMode) => ({
  mode,
  common,
  grey,
  info,
  warning,
  carbs,
  protein,
  fat,
  ...modes[mode as keyof Mode],
});

export default palette;
