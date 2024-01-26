'use client';

import { useSearchParams } from 'next/navigation';
import { capitalize } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import PageTitle from '@/components/page-title';
import Link from 'next/link';

const Title = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <Button
      color="inherit"
      size="large"
      startIcon={<ArrowBackIcon />}
      component={Link}
      href="/"
      sx={{ fontWeight: 400, alignSelf: 'flex-start', ml: -1.5 }}
    >
      <PageTitle>{category ? capitalize(category) : 'Meals'}</PageTitle>
    </Button>
  );
};

export default Title;
