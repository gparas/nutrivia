'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import useIsMobile from '@/hooks/useIsMobile';

const Dialog = ({ ...other }: DialogProps) => {
  const router = useRouter();
  const isMobile = useIsMobile('sm');

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return <MuiDialog fullScreen={isMobile} onClose={handleClose} {...other} />;
};

export default Dialog;
