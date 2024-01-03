'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BackButton from '@/components/back-button';
import Card from '@/components/card';
import { submit } from './actions';
import SubmitFormButton from '@/components/submit-form-button';

function SubmitButton() {
  const pathname = usePathname();

  if (pathname.includes('macronutrients')) return null;

  return <SubmitFormButton>Save</SubmitFormButton>;
}

const DialogLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Box component="form" action={submit}>
        <Card spacing={3} p={3}>
          {children}
          <SubmitButton />
        </Card>
      </Box>
    </Container>
  );
};

export default DialogLayout;
