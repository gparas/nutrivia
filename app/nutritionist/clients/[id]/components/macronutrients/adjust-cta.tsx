'use client';

import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@/components/dialog';
import MacronutrientsForm from './form';
import { Tables } from '@/types/supabase';

const AdjustCta = ({ profile }: { profile: Tables<'profiles'> }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button
        variant="contained"
        color="neutral"
        onClick={handleClickOpen}
        sx={{ mt: 3, fontWeight: 500 }}
      >
        Adjust Macronutrients
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <MacronutrientsForm profile={profile} onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default AdjustCta;
