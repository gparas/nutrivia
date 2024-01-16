'use client';

import { useSearchParams } from 'next/navigation';
import { capitalize } from '@mui/material';
import BackButton from '@/components/back-button';
import PageTitle from '@/components/page-title';

const Title = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  return (
    <BackButton
      label={<PageTitle>{category ? capitalize(category) : 'Meals'}</PageTitle>}
    />
  );
};

export default Title;
