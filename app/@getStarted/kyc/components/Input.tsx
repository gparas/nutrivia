'use client';

import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

type Props = {
  label: string;
  unit?: string;
} & TextFieldProps;

type Ref = HTMLDivElement;

const Input = forwardRef<Ref, Props>((props, ref) => {
  const { unit, label, ...other } = props;
  return (
    <TextField
      ref={ref}
      variant="filled"
      label={label}
      InputLabelProps={{ required: false }}
      FormHelperTextProps={{
        sx: { mx: 0, mt: 0.5 },
      }}
      InputProps={{
        endAdornment: unit ? (
          <InputAdornment position="end">{unit}</InputAdornment>
        ) : null,
      }}
      {...other}
    />
  );
});

Input.displayName = 'Input';

export default Input;
