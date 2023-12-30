'use client';

import { ReactNode, useEffect, useState } from 'react';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode;
  value: number;
} & CircularProgressProps;

const CircularProgressWithLabel = ({ value, children, ...other }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const SIZE = 112;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size={SIZE}
        thickness={1}
        value={100}
        color="inherit"
        sx={{ opacity: 0.12 }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        color="inherit"
        sx={{
          left: 0,
          position: 'absolute',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={SIZE}
        thickness={1}
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
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
