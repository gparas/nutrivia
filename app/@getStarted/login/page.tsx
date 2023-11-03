'use client';

import { signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import GoogleIcon from './GoogleIcon';

const page = () => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<GoogleIcon />}
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      Sign in with Google
    </Button>
  );
};

export default page;
