import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import ClientTabs from './components/tabs';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  params: { id: string };
}

const ClientLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <Button
        color="inherit"
        startIcon={<ArrowBackIcon />}
        size="large"
        component={Link}
        href="/nutritionist"
        sx={{ fontWeight: 400, alignSelf: 'flex-start', ml: -1.5 }}
      >
        back
      </Button>
      <ClientTabs user_id={id} />
      <Divider sx={{ mb: 5, mt: '-1px' }} />
      {children}
    </>
  );
};

export default ClientLayout;
