'use client';

import { useCallback, useState } from 'react';
import { Tables } from '@/types/supabase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@/components/dialog';
import AdjustMealsForm from './form';

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
      <Box flex="0 0 auto" mt={3}>
        <Button
          variant="contained"
          color="neutral"
          fullWidth
          onClick={handleClickOpen}
          sx={{ fontWeight: 500 }}
        >
          Adjust Meals
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <AdjustMealsForm onClose={handleClose} profile={profile} />
      </Dialog>
    </>
  );
};

export default AdjustCta;
