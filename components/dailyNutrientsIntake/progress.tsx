'use client';

import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

type Props = {
  value: number;
  color: 'carbs' | 'protein' | 'fat';
};

const Progress = ({ value, color }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <LinearProgress variant="determinate" value={progress} color={color} />
  );
};

export default Progress;
