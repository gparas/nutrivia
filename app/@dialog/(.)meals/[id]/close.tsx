'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Close = () => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 1,
        color: theme => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default Close;
