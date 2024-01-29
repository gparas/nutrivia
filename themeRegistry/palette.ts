import { PaletteMode, alpha } from '@mui/material';
import grey from './grey';


const common = {
  black: '#2a2e43'
}

const primary = {
  light: '#C09EEC',
  main: '#7E57C2',
  dark: '#472B8B',
};

const success = {
  light: '#C2EEBB',
  main: '#81C784',
  dark: '#185F34',
};

const info = {
  main: '#2196F3',
};

const warning  = {
  light: '#FFDC94',
  main: '#FFB74D',
  dark: '#7A3D0E'
};

const error  = {
  main: '#FF5252'
};

const carbs = {
  main: primary.main,
};

const protein = {
  main: info.main,
};

const fat = {
  main: warning.main,
};

const light = {
  secondary: {
    main: primary.main,
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
    default: '#f1f1f1',
  },
};

const dark = {
  secondary: {
    main: primary.light,
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
  primary,
  success,
  info,
  warning,
  error,
  carbs,
  protein,
  fat,
  ...modes[mode as keyof Mode],
});

export default palette;
