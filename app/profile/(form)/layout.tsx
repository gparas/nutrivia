'use client';

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { usePathname } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import Card from '@/components/card';
import { submit } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  const pathname = usePathname();

  if (pathname.includes('macronutrients')) return null;

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
      <Button
        color="inherit"
        component={Link}
        href="/profile"
        startIcon={<ArrowBackIcon />}
        size="large"
        sx={{ fontWeight: 400 }}
      >
        Back
      </Button>
      <Box component="form" action={submit} mt={2}>
        <Card spacing={3} p={3}>
          {children}
          <SubmitButton />
        </Card>
      </Box>
    </Container>
  );
};

export default DialogLayout;
