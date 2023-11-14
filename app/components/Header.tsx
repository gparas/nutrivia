import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <AppBar
      color="default"
      elevation={0}
      position="sticky"
      sx={{ flex: '0 0 auto' }}
    >
      <Toolbar>
        <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1 }}>
          <Link component={NextLink} href="/" underline="none" color="inherit">
            nutrivia
          </Link>
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
