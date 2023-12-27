import React from 'react';
import EmptyIcon from './icon';
import { Container } from '@mui/material';

const EmptyState = () => {
  return (
    <Container
      disableGutters
      maxWidth="xs"
      sx={{
        py: 3,
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EmptyIcon />
    </Container>
  );
};

export default EmptyState;
