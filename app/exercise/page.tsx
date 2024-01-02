import React from 'react';
import Container from '@mui/material/Container';
import Exercise from '@/components/exercise';
import Card from '@/components/card';

const ExercisePage = () => {
  return (
    <Container maxWidth="xs" disableGutters>
      <Card p={0}>
        <Exercise />
      </Card>
    </Container>
  );
};

export default ExercisePage;
