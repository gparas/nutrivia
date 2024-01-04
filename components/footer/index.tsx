import NextLink from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <Container component="footer" sx={{ py: 1 }}>
      <Divider light sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} color="text.secondary">
        <Button
          variant="text"
          color="inherit"
          component={NextLink}
          href="/nutritionist"
          sx={{ fontWeight: 500 }}
        >
          nutritionist
        </Button>
      </Stack>
    </Container>
  );
};

export default Footer;
