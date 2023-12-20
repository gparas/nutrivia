import { cookies } from 'next/headers';
import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createClient } from '@/supabase/server';
import UserMenu from './userMenu';

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        <UserMenu user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
