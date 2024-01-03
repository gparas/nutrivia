'use client';

import { useFormStatus } from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';

const SubmitFormButton = ({ ...other }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      endIcon={pending && <CircularProgress size={20} color="inherit" />}
      {...other}
    />
  );
};

export default SubmitFormButton;
