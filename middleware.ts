import { type NextRequest } from 'next/server';
import { createClient } from '@/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  await supabase.auth.getUser();
  return response;
}
