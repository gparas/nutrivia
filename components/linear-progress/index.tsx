'use client';

import { useEffect, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { root, progress_bar } from './styles';

type Props = {
  value: number;
} & BoxProps;

const LinearProgress = ({ value, ...other }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const width = progress > 100 ? 100 : progress;
  return (
    <Box sx={root} {...other}>
      <Box sx={progress_bar} width={`${width}%`} bgcolor="primary.main" />
    </Box>
  );
};

export default LinearProgress;
