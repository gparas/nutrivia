import { PropsWithChildren } from 'react';
import Container from '@mui/material/Container';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="md" disableGutters>
      {children}
    </Container>
  );
};

export default ProfileLayout;
