'use client';

import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

type Props = {
  value: number;
};

const Progress = ({ value }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <LinearProgress
      variant="determinate"
      value={progress > 100 ? 100 : progress}
      color="inherit"
    />
  );
};

export default Progress;
