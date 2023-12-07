'use client';

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import Card from '@/components/card';
import { submit } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      endIcon={pending && <CircularProgress size={20} color="inherit" />}
    >
      Save
    </Button>
  );
}

const DialogLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="xs" disableGutters>
      <Stack component="form" action={submit} spacing={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton component={Link} href="/profile">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Back to profile</Typography>
        </Stack>
        <Card spacing={3} p={3}>
          {children}
          <SubmitButton />
        </Card>
      </Stack>
    </Container>
  );
};

export default DialogLayout;
