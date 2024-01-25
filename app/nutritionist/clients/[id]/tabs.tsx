'use client';

import { usePathname } from 'next/navigation';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

const ClientTabs = ({ user_id }: { user_id: string }) => {
  const pathname = usePathname();

  const rootPath = `/nutritionist/clients/${user_id}`;
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
        label="Overview"
        component={Link}
        href={rootPath}
        value={rootPath}
        sx={{ px: 0, minWidth: 'auto' }}
      />
      <Tab
        label="Meal Plan"
        component={Link}
        href={`${rootPath}/planner`}
        value={`${rootPath}/planner`}
        sx={{ px: 0, minWidth: 'auto' }}
      />
    </Tabs>
  );
};

export default ClientTabs;
