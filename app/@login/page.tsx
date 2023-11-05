'use client';

import { signIn } from 'next-auth/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import GoogleIcon from './GoogleIcon';
import Typography from '@mui/material/Typography';

const page = () => {
  return (
    <Container maxWidth="xs" component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" color="initial" mb={3} align="center">
          Let&apos;s get your personalized <br />
          health plan
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default page;
