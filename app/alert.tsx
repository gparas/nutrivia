'use client';

import { Theme, darken } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';

const root = (theme: Theme) => ({
  alignItems: 'flex-start',
  bgcolor: 'primary.light',
  color: darken(theme.palette.primary.main, 0.4),
  borderRadius: 1,
  '&:hover': {
    bgcolor: darken(theme.palette.primary.light, 0.08),
  },
});

const Alert = ({ nutritionist_id }: { nutritionist_id: string | null }) => {
  if (nutritionist_id) {
    return null;
  }
  return (
    <ListItemButton sx={root} component={Link} href="nutritionists">
      <ListItemAvatar sx={{ mt: 0.75 }}>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <AutoAwesomeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Find a Nutrition Expert"
        secondary="Our nutritionists are trained professionals who can provide personalized advice based on your individual needs, health status, and goals."
        primaryTypographyProps={{ color: 'inherit', fontWeight: 600 }}
        secondaryTypographyProps={{ color: 'inherit' }}
      />
    </ListItemButton>
  );
};

export default Alert;
