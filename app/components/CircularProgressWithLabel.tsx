'use client';

import { ReactNode } from 'react';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode;
  value: number;
} & CircularProgressProps;

const CircularProgressWithLabel = ({ value, children, ...other }: Props) => {
  const SIZE = 104;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size={SIZE}
        thickness={4}
        value={100}
        sx={{ color: 'grey.200' }}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        value={value}
        sx={{
          left: 0,
          position: 'absolute',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={SIZE}
        thickness={4}
        {...other}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {children}
        <Typography
          component="div"
          color="text.secondary"
          fontWeight="medium"
          variant="body2"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
