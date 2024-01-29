import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import ClientsTable from './clients-table';

const Clients = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase.from('profiles').select();
  return (
    <Card p={1}>
      <Typography variant="h6" fontWeight={500} p={1}>
        Clients
      </Typography>
      <ClientsTable profiles={profiles || []} />
    </Card>
  );
};

export default Clients;
