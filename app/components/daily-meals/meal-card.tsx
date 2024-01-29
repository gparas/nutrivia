import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/WarningAmber';
import Card from '@/components/card';
import Link from 'next/link';

const Breakfast = dynamic(() => import('@/icons/Breakfast'));
const Lunch = dynamic(() => import('@/icons/Lunch'));
const Dinner = dynamic(() => import('@/icons/Dinner'));
const Snack = dynamic(() => import('@/icons/Snack'));

const iconMapping: { [char: string]: ComponentType<SvgIconProps> } = {
  breakfast: Breakfast,
  lunch: Lunch,
  dinner: Dinner,
  snack: Snack,
};

interface Props {
  href: string;
  textPrimary: string;
  textSecondary: string;
  orderedMealKcal?: number;
  orderedMealKcalDiff?: number;
  category: string;
}

const MealCard = ({
  href,
  category,
  textPrimary,
  textSecondary,
  orderedMealKcal,
  orderedMealKcalDiff,
}: Props) => {
  const Icon = iconMapping[category];
  return (
    <Card p={0}>
      <ListItemButton component={Link} href={href}>
        <ListItemIcon>
          <Icon sx={{ fontSize: 40 }} />
        </ListItemIcon>
        <ListItemText primary={textPrimary} secondary={textSecondary} />
        {orderedMealKcal ? (
          <CheckCircleRounded color="success" />
        ) : (
          <AddIcon color="disabled" />
        )}
      </ListItemButton>
      {orderedMealKcalDiff ? (
        <>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            py={1.5}
            pl={8}
            pr={2}
            spacing={0.4}
          >
            {orderedMealKcalDiff > 0 ? (
              <CheckIcon sx={{ fontSize: 18 }} color="success" />
            ) : (
              <WarningIcon sx={{ fontSize: 18 }} color="warning" />
            )}
            <Typography variant="body2">{orderedMealKcal}kcal</Typography>
            <Typography variant="body2" color="text.secondary">
              &#8226; {Math.abs(orderedMealKcalDiff)}kcal{' '}
              {orderedMealKcalDiff > 0 ? 'under' : 'above'}
            </Typography>
          </Stack>
        </>
      ) : null}
    </Card>
  );
};

export default MealCard;
