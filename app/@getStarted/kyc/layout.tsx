'use client';

import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import { FormProvider } from './components/FormContext';

interface Props {
  children: ReactNode;
}

const KyxLayout = ({ children }: Props) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        my: 3,
      }}
    >
      <FormProvider>{children}</FormProvider>
    </Container>
  );
};

export default KyxLayout;
