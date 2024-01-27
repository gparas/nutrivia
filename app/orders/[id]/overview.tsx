import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/card';
import Image from 'next/image';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/ErrorOutline';

type Props = {
  recommendedKcal: number;
} & Tables<'foods'>;

const Overview = ({ recommendedKcal, kcal, image, name, category }: Props) => {
  const kcalDiff = Number(kcal) - recommendedKcal;
  return (
    <Card mb={2} alignItems="center">
      <Badge
        overlap="circular"
        color={kcalDiff <= 0 ? 'success' : 'warning'}
        badgeContent={
          kcalDiff <= 0 ? (
            <CheckIcon sx={{ fontSize: 16 }} />
          ) : (
            <WarningIcon sx={{ fontSize: 16 }} />
          )
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            p: 0,
          },
        }}
      >
        <Box display="inline-flex" justifyContent="center">
          <Avatar
            sx={{
              width: 128,
              height: 128,
              position: 'relative',
              bgcolor: 'transparent',
            }}
          >
            <Image
              priority
              fill
              src={image}
              alt={name}
              sizes="33vw"
              style={{ objectFit: 'cover' }}
            />
          </Avatar>
        </Box>
      </Badge>
      <ListItemText
        primary={name}
        secondary={category}
        primaryTypographyProps={{ variant: 'h5' }}
        secondaryTypographyProps={{ variant: 'body1' }}
        sx={{ textAlign: 'center', mb: 4 }}
      />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem light />}
        spacing={2}
      >
        <Box textAlign="center">
          <Typography variant="overline" color="text.secondary">
            Goal intake
          </Typography>
          <Typography fontWeight={500}>
            {recommendedKcal}{' '}
            <Typography variant="caption" component="span">
              kcal
            </Typography>
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="overline" color="text.secondary">
            your intake
          </Typography>
          <Typography fontWeight={500}>
            {kcal}{' '}
            <Typography variant="caption" component="span">
              kcal
            </Typography>
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="overline" color="text.secondary">
            difference
          </Typography>
          <Typography
            color={kcalDiff <= 0 ? 'success.main' : 'warning.main'}
            fontWeight={500}
          >
            {kcalDiff <= 0 ? <span>&darr;</span> : <span>&uarr;</span>}
            {Math.abs(kcalDiff)}{' '}
            <Typography variant="caption" component="span">
              kcal
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default Overview;
