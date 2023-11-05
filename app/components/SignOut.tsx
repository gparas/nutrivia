'use client';

import { auth } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Button from '@mui/material/Button';
import { useAuth } from '@/auth/provider';

const SignOut = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  if (!user) return null;
  return (
    <Button onClick={handleClick} variant="text" color="inherit">
      Sign out
    </Button>
  );
};

export default SignOut;
