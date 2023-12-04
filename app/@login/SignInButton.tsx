'use client';

import { createClient } from '@/supabase/client';
import Button from '@mui/material/Button';
import GoogleIcon from './GoogleIcon';

const SignInButton = () => {
  const supabase = createClient();
  const handleSignIn = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Button
      variant="outlined"
      color="inherit"
      size="large"
      startIcon={<GoogleIcon />}
      onClick={handleSignIn}
      sx={{ height: 56 }}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
