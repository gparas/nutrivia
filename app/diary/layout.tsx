'use client';

import { ReactNode } from 'react';
import Container from '@mui/material/Container';

interface Props {
  children: ReactNode;
}

const DiaryLayout = ({ children }: Props) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {children}
    </Container>
  );
};

export default DiaryLayout;
