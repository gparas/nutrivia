import React from 'react';
import EmptyIcon from './icon';
import { Container, Typography } from '@mui/material';

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
        flexDirection: 'column',
      }}
    >
      <EmptyIcon />
      <Typography variant="h5" color="text.secondary" fontWeight={500} mt={3}>
        No data
      </Typography>
    </Container>
  );
};

export default EmptyState;
