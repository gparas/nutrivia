'use client';

import { useState, MouseEvent } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import UserIcon from '@/icons/User';

const UserMenu = ({ user }: { user: User | null }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!user) return null;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} edge="end">
        <UserIcon />
      </IconButton>
      <Menu
        sx={{ mt: 6 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem component={Link} href="/profile">
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
