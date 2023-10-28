import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Props {
  children: React.ReactNode;
}

const OnboardinLayout = ({ children }: Props) => {
  return (
    <>
      <AppBar color="default" elevation={0} position="sticky">
        <Toolbar>
          <Typography variant="h5" fontWeight="bold">
            nutrivia
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">{children}</Container>
    </>
  );
};

export default OnboardinLayout;
