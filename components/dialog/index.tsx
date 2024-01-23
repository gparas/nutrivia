'use client';

import { ReactNode } from 'react';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useIsMobile from '@/hooks/useIsMobile';

type Props = {
  onClose: () => void;
  children: ReactNode;
} & DialogProps;

const Dialog = ({ onClose, children, ...other }: Props) => {
  const isMobile = useIsMobile('sm');
  return (
    <MuiDialog
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xs"
      {...other}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: ['fixed', 'absolute'],
          right: 8,
          top: 8,
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
