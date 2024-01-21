import React, { PropsWithChildren } from 'react';
import ProfileTabs from './tabs';
import PageTitle from '@/components/page-title';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PageTitle>Profile</PageTitle>
      <ProfileTabs />
      {children}
    </>
  );
};

export default ProfileLayout;
