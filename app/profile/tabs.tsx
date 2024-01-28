'use client';

import { usePathname } from 'next/navigation';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs
      value={pathname}
      textColor="secondary"
      indicatorColor="secondary"
      sx={{
        '& .MuiTabs-flexContainer': {
          gap: 3,
        },
      }}
    >
      <Tab
        label="General"
        component={Link}
        href="/profile"
        value="/profile"
        sx={{ px: 0, minWidth: 'auto' }}
      />
      <Tab
        label="Progress"
        component={Link}
        href="/profile/progress"
        value="/profile/progress"
        sx={{ px: 0, minWidth: 'auto' }}
      />
    </Tabs>
  );
};

export default ProfileTabs;
