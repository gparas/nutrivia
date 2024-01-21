import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Card from '@/components/card';

const Chat = ({
  nutritionist,
}: {
  nutritionist: { name: string; image: string };
}) => {
  const firstName = nutritionist.name.split(' ')[0];
  return (
    <Card p={0} height={'72vh'} flex="1 1 auto">
      <Box p={3} flex="1 1 auto" sx={{ overflowY: 'auto' }}>
        <Stack direction="row" mb={5}>
          <div>
            <Typography variant="caption" color="text.secondary">
              {firstName}, 8 minutes ago
            </Typography>
            <Box
              mt={1}
              p={1.5}
              bgcolor="action.disabledBackground"
              maxWidth={320}
              borderRadius={1}
            >
              <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </Box>
          </div>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mb={5}>
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              textAlign="right"
            >
              You, 6 minutes ago
            </Typography>
            <Box
              mt={1}
              p={1.5}
              bgcolor="primary.main"
              color="primary.contrastText"
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
        <Stack direction="row" mb={5}>
          <div>
            <Typography variant="caption" color="text.secondary">
              {firstName}, 4 minutes ago
            </Typography>
            <Box
              mt={1}
              p={1.5}
              bgcolor="action.disabledBackground"
              maxWidth={320}
              borderRadius={1}
            >
              <Typography variant="body2">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>
          </div>
        </Stack>
        <Stack direction="row" mb={5}>
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              mb={1}
            >
              {firstName}, 2 minutes ago
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
        <Stack direction="row" justifyContent="flex-end" mb={5}>
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              textAlign="right"
            >
              You, 2 minutes ago
            </Typography>
            <Box
              mt={1}
              p={1.5}
              bgcolor="primary.main"
              color="primary.contrastText"
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
        <Stack direction="row" justifyContent="flex-end" mb={5}>
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              textAlign="right"
            >
              You, 1 minutes ago
            </Typography>
            <Box
              mt={1}
              p={1.5}
              bgcolor="primary.main"
              color="primary.contrastText"
              maxWidth={320}
              borderRadius={1}
            >
              <Typography variant="body2">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </Typography>
            </Box>
          </div>
        </Stack>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        px={2}
        py={1.5}
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
  );
};

export default Chat;
