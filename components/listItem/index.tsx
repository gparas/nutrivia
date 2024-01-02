import { ComponentType } from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { SvgIconProps } from '@mui/material/SvgIcon';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckIcon from '@mui/icons-material/CheckCircleRounded';
import HappyIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SadIcon from '@mui/icons-material/SentimentDissatisfied';
import Card from '../card';

const Breakfast = dynamic(() => import('@/icons/Breakfast'));
const Lunch = dynamic(() => import('@/icons/Lunch'));
const Dinner = dynamic(() => import('@/icons/Dinner'));
const Snack = dynamic(() => import('@/icons/Snack'));
const Exercise = dynamic(() => import('@/icons/Exercise'));
const Water = dynamic(() => import('@/icons/Water'));
const Diet = dynamic(() => import('@/icons/Diet'));

type Props = ListItemButtonProps & {
  iconId: string;
  textPrimary: string;
  textSecondary?: string;
  href?: string;
  ordered?: boolean;
  orderedKcal?: number;
  orderedKcalDiff?: number;
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
  iconId,
  textPrimary,
  textSecondary,
  href,
  ordered,
  orderedKcal,
  orderedKcalDiff,
  ...other
}: Props) => {
  const Icon = iconMapping[iconId];
  return (
    <Card p={0}>
      <ListItemButton
        component={href ? NextLink : 'div'}
        href={href}
        {...other}
      >
        <ListItemIcon>
          <Icon sx={{ fontSize: 40 }} />
        </ListItemIcon>
        <ListItemText primary={textPrimary} secondary={textSecondary} />
        {ordered ? <CheckIcon color="success" /> : <AddIcon color="disabled" />}
      </ListItemButton>
      {ordered && (
        <>
          <Divider light />
          <Stack
            direction="row"
            alignItems="center"
            py={1.5}
            pl={8}
            pr={2}
            spacing={0.4}
          >
            {orderedKcalDiff && orderedKcalDiff > 0 ? (
              <HappyIcon sx={{ fontSize: 18 }} color="success" />
            ) : (
              <SadIcon sx={{ fontSize: 18 }} color="warning" />
            )}
            <Typography variant="body2">{orderedKcal}kcal</Typography>
            <Typography variant="body2" color="text.secondary">
              &#8226; {orderedKcalDiff && Math.abs(orderedKcalDiff)}kcal{' '}
              {orderedKcalDiff && orderedKcalDiff > 0 ? 'under' : 'above'}
            </Typography>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default ListItem;
