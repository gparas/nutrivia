import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar color="default" elevation={0} position="sticky">
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
          <Link component={NextLink} href="/" underline="none" color="inherit">
            nutrivia
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
