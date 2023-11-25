import { ComponentType } from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { SvgIconProps } from '@mui/material';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Breakfast = dynamic(() => import('@/icons/Breakfast'));
const Lunch = dynamic(() => import('@/icons/Lunch'));
const Dinner = dynamic(() => import('@/icons/Dinner'));
const Snack = dynamic(() => import('@/icons/Snack'));
const Exercise = dynamic(() => import('@/icons/Exercise'));
const Water = dynamic(() => import('@/icons/Water'));
const Diet = dynamic(() => import('@/icons/Diet'));

type Props = ListItemButtonProps & {
  id: string;
  textPrimary: string;
  textSecondary?: string;
  href?: string;
  sx?: object;
};

const iconMapping: { [char: string]: ComponentType<SvgIconProps> } = {
  breakfast: Breakfast,
  lunch: Lunch,
  dinner: Dinner,
  snack: Snack,
  water: Water,
  exercise: Exercise,
  diet: Diet,
};

const ListItem = ({
  id,
  textPrimary,
  textSecondary,
  href,
  sx,
  ...other
}: Props) => {
  const Icon = iconMapping[id];
  return (
    <ListItemButton
      component={NextLink}
      href={href}
      sx={{ bgcolor: 'background.paper', borderRadius: 1, ...sx }}
      {...other}
    >
      <ListItemIcon>
        <Icon sx={{ fontSize: 40 }} />
      </ListItemIcon>
      <ListItemText
        primary={textPrimary}
        secondary={textSecondary}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
      <ChevronRightIcon sx={{ opacity: 0.5 }} />
    </ListItemButton>
  );
};

export default ListItem;