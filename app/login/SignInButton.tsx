'use client';

import { createClient } from '@/supabase/client';
import Button from '@mui/material/Button';
import Google from '@/icons/Google';

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
      startIcon={<Google />}
      onClick={handleSignIn}
      sx={{ height: 56 }}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
