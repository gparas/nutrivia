import { PaletteMode, alpha } from '@mui/material';
import { blueGrey} from '@mui/material/colors';
import violet from './violet';


const grey = blueGrey;

const black = '#111827';


const primary = {
  main: violet[500],
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
    default: '#f1f5f9',
  },
};

const dark = {
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
  primary,
  grey,
  info,
  warning,
  carbs,
  protein,
  fat,
  ...modes[mode as keyof Mode],
});

export default palette;
