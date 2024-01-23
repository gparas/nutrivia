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
      PaperProps={{
        elevation: 0,
        sx: { boxShadow: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px' },
      }}
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
