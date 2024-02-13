import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
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
      position="relative"
      sx={{ flex: '0 0 auto' }}
    >
      <Toolbar>
        <Link
          component={NextLink}
          href="/"
          underline="none"
          color="inherit"
          variant="h6"
          fontWeight="500"
          sx={{ flexGrow: 1 }}
        >
          nutrivia
        </Link>
        <UserMenu user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
