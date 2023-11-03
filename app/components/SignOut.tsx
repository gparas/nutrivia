'use client';

import Button from '@mui/material/Button';
import { signOut, useSession } from 'next-auth/react';

const SignOut = () => {
  const { status } = useSession();

  if (status === 'unauthenticated' || status === 'loading') {
    return null;
  }
  return (
    <Button onClick={() => signOut()} variant="text" color="inherit">
      Sign out
    </Button>
  );
};

export default SignOut;
