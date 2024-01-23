'use client';

import { ReactNode } from 'react';
import { ModalProps } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
  open: ModalProps['open'];
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ open, onClose, children }: Props) => {
  const isMobile = useIsMobile('sm');
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        elevation: 0,
        sx: { boxShadow: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px' },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
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
