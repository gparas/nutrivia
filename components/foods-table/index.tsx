import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Table from './table';

const FoodsTable = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase
    .from('foods')
    .select()
    .range(0, 20)
    .order('created_at', { ascending: false });

  return <Table rows={foods || []} />;
};

export default FoodsTable;
