import Container from '@mui/material/Container';

interface Props {
  children: React.ReactNode;
}

const OnboardinLayout = ({ children }: Props) => {
  return (
    <Container maxWidth="xs" sx={{ my: 3 }}>
      {children}
    </Container>
  );
};

export default OnboardinLayout;
