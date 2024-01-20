import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Card from '@/components/card';
import BackButton from '@/components/back-button';
import PageTitle from '@/components/page-title';
import NutritionistAvatar from '../nutritionist-avatar';

const ChatPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  const { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .eq('id', profile?.nutritionist_id || '')
    .single();

  if (!profile || !nutritionist) {
    notFound();
  }

  return (
    <>
      <BackButton label={<PageTitle>Chat</PageTitle>} />
      <Card p={0} mt={2} height="72vh">
        <Stack direction="row" alignItems="center" px={2} flex="0 0 auto">
          <ListItem component="div" disableGutters>
            <NutritionistAvatar nutritionist={nutritionist} size={40} />
            <ListItemText
              primary={nutritionist.name}
              secondary="Online"
              sx={{ ml: 2 }}
            />
          </ListItem>
          <Tooltip title="book appointment">
            <IconButton
              component={Link}
              aria-label="book-appointment"
              href={`/nutritionists/appointment/${nutritionist.id}`}
            >
              <VideocamIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Divider />
        <Box p={3} flex="1 1 auto" sx={{ overflowY: 'auto' }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" mb={5}>
            <NutritionistAvatar
              nutritionist={nutritionist}
              size={32}
              invisible
            />
            <div>
              <Typography variant="caption" color="text.secondary">
                {nutritionist.name.split(' ')[0]}, 8 minutes ago
              </Typography>
              <Box
                mt={1}
                p={1.5}
                bgcolor="action.disabledBackground"
                maxWidth={320}
                borderRadius={1}
              >
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </Box>
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-end"
            mb={5}
          >
            <div>
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
                textAlign="right"
              >
                6 minutes ago
              </Typography>
              <Box
                mt={1}
                p={1.5}
                bgcolor="primary.main"
                maxWidth={320}
                borderRadius={1}
              >
                <Typography variant="body2">
                  Lorem Ipsum has been the industry&apos;s standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book.
                </Typography>
              </Box>
            </div>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="flex-start" mb={5}>
            <NutritionistAvatar
              nutritionist={nutritionist}
              size={32}
              invisible
            />
            <div>
              <Typography variant="caption" color="text.secondary">
                {nutritionist.name.split(' ')[0]}, 4 minutes ago
              </Typography>
              <Box
                mt={1}
                p={1.5}
                bgcolor="action.disabledBackground"
                maxWidth={320}
                borderRadius={1}
              >
                <Typography variant="body2">
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </Typography>
              </Box>
            </div>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="flex-start" mb={5}>
            <NutritionistAvatar
              nutritionist={nutritionist}
              size={32}
              invisible
            />
            <div>
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
                mb={1}
              >
                {nutritionist.name.split(' ')[0]}, 2 minutes ago
              </Typography>
              <Image
                alt="food"
                src="https://res.cloudinary.com/dc1qw84yo/image/upload/v1705561413/awxke6ryra7lfjwkqkvc.webp"
                width={240}
                height={180}
                style={{ borderRadius: 8 }}
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-end"
            mb={5}
          >
            <div>
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
                textAlign="right"
              >
                2 minutes ago
              </Typography>
              <Box
                mt={1}
                p={1.5}
                bgcolor="primary.main"
                maxWidth={320}
                borderRadius={1}
              >
                <Typography variant="body2">
                  It was popularised in the 1960s with the release of Letraset
                  sheets
                </Typography>
              </Box>
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-end"
            mb={5}
          >
            <div>
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
                textAlign="right"
              >
                1 minutes ago
              </Typography>
              <Box
                mt={1}
                p={1.5}
                bgcolor="primary.main"
                maxWidth={320}
                borderRadius={1}
              >
                <Typography variant="body2">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old.
                </Typography>
              </Box>
            </div>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          p={2}
          flex="0 0 auto"
          spacing={1}
        >
          <IconButton aria-label="emoticon">
            <InsertEmoticonIcon />
          </IconButton>
          <InputBase
            placeholder="Type a message"
            sx={{ height: 40, flex: '1 1 auto' }}
          />
          <IconButton aria-label="attach-file">
            <AttachFileIcon />
          </IconButton>
          <IconButton
            aria-label="send"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
};

export default ChatPage;
