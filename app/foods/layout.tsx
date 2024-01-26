import React, { PropsWithChildren } from 'react';
import Divider from '@mui/material/Divider';
import ProfileTabs from './tabs';
import Title from './components/title';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Title />
      <ProfileTabs />
      <Divider sx={{ mb: 5, mt: '-1px' }} />
      {children}
    </>
  );
};

export default ProfileLayout;
