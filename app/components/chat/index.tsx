import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import ChatPopover from './chat-popover';

const Chat = async ({
  nutritionist_id,
}: {
  nutritionist_id: string | null;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!nutritionist_id) {
    return null;
  }

  const { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .eq('id', nutritionist_id)
    .single();

  return <ChatPopover nutritionist={nutritionist!} />;
};

export default Chat;
