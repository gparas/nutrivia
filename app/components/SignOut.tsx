'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';

const SignOut = () => {
  const { status } = useSession();

  if (status === 'loading') return null;

  if (status === 'unauthenticated') return null;
  return (
    <Button onClick={() => signOut()} variant="text" color="inherit">
      Sign out
    </Button>
  );
};

export default SignOut;
