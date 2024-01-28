'use client';

import { useState, MouseEvent } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import UserIcon from '@/icons/User';
import { createClient } from '@/supabase/client';

const UserMenu = ({ user }: { user: User | null }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const supabase = createClient();

  const handleSignOut = async () => {
    handleCloseUserMenu();
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} edge="end" aria-label="profile">
        <UserIcon />
      </IconButton>
      <Menu
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
        MenuListProps={{
          dense: true,
        }}
        sx={{ mt: 6 }}
      >
        <MenuItem
          component={Link}
          href="/profile"
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          href="/profile/progress"
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign="center">Progress</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
