import React, { PropsWithChildren } from 'react';
import PageTitle from '@/components/page-title';
import Divider from '@mui/material/Divider';
import ProfileTabs from './tabs';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PageTitle>Profile</PageTitle>
      <ProfileTabs />
      <Divider sx={{ mb: 5, mt: '-1px' }} />
      {children}
    </>
  );
};

export default ProfileLayout;
