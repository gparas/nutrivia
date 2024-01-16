'use client';

import { ReactNode, SyntheticEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@/components/card';
import BackButton from '@/components/back-button';

const tabs = {
  overview: dynamic(() => import('./overview'), {
    loading: () => <Typography>Loading...</Typography>,
  }),
  reviews: dynamic(() => import('./reviews'), {
    loading: () => <Typography>Loading...</Typography>,
  }),
};

type Tabs = {
  overview: ReactNode;
  reviews: ReactNode;
};

interface Props {
  name: string;
  image: string;
  expertise?: string | null;
  description?: string | null;
  rating?: number | null;
}

const NutritionistProfile = ({
  name,
  image,
  expertise,
  description,
  rating,
}: Props) => {
  const [value, setValue] = useState('overview');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Component = tabs[value as keyof Tabs];
  return (
    <>
      <BackButton />
      <Card p={0} mt={2}>
        <Stack direction="row" spacing={2} p={2} alignItems="center">
          <Avatar sx={{ width: 88, height: 88 }}>
            <Image alt={name} src={image} priority width={88} height={88} />
          </Avatar>
          <Box flex="1 1 auto">
            <Typography variant="h6" fontWeight={500}>
              {name}
            </Typography>
            <Typography variant="body2" mb={2} color="text.secondary">
              {expertise}
            </Typography>
          </Box>
        </Stack>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ px: 2 }}
        >
          <Tab value="overview" label="Overview" />
          <Tab value="reviews" label="Reviews" />
        </Tabs>
        <Divider light />
        <Box p={3}>
          <Component description={description} rating={rating} />
        </Box>
      </Card>
    </>
  );
};

export default NutritionistProfile;
