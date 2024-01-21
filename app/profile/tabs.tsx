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
        mb: 5,
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
        label="Nutritionist"
        component={Link}
        href="/profile/nutritionist"
        value="/profile/nutritionist"
        sx={{ px: 0, minWidth: 'auto' }}
      />
    </Tabs>
  );
};

export default ProfileTabs;
