'use client';

import { ReactNode, SyntheticEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Card from '@/components/card';

const tabs = {
  overview: dynamic(() => import('./overview')),
  reviews: dynamic(() => import('./reviews')),
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
      <Button
        color="inherit"
        component={Link}
        href="/nutritionists"
        startIcon={<ArrowBackIcon />}
        size="large"
        sx={{ fontWeight: 400 }}
      >
        Back
      </Button>
      <Card p={0}>
        <Stack direction="row" spacing={2} p={2} alignItems="center">
          <Avatar sx={{ width: 88, height: 88 }}>
            <Image
              alt={name}
              src={image}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                objectPosition: '50% 25%',
              }}
            />
          </Avatar>
          <Box flex="1 1 auto">
            <Typography variant="h6" fontWeight={500}>
              {name}
            </Typography>
            <Typography variant="body2" mb={2}>
              {expertise}
            </Typography>
          </Box>
        </Stack>
        <Tabs
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
