'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import useIsMobile from '@/hooks/useIsMobile';
import { submit } from './actions';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      endIcon={pending && <CircularProgress size={20} color="inherit" />}
    >
      Save
    </Button>
  );
}

const DialogLayout = ({ children }: PropsWithChildren) => {
  const [state, formAction] = useFormState(submit, initialState);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;
    router.back();
  }, [state.message]);

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open scroll="paper" fullScreen={isMobile}>
      <Stack
        flex="1 1 auto"
        component="form"
        action={formAction}
        sx={{ overflowY: 'auto', minWidth: 320 }}
      >
        {children}
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <SubmitButton />
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default DialogLayout;
