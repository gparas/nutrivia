import { ReactNode } from 'react';
import Container from '@mui/material/Container';

interface Props {
  children: ReactNode;
}

const GetStartedLayout = ({ children }: Props) => {
  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Container>
  );
};

export default GetStartedLayout;
