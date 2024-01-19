import React from 'react';
import AddForm from './form';
import Container from '@mui/material/Container';
import PageTitle from '@/components/page-title';
import BackButton from '@/components/back-button';

const AddPage = () => {
  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton label={<PageTitle>Add meal</PageTitle>} />
      <AddForm />
    </Container>
  );
};

export default AddPage;
