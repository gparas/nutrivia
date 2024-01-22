'use client';

import { useState } from 'react';
import Link from 'next/link';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import ChatIcon from '@mui/icons-material/Chat';

const Chat = ({
  nutrionist,
}: {
  nutrionist: { id: string; name: string; image: string } | null;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'chat-popover' : undefined;

  if (!nutrionist) return null;
  const firstName = nutrionist.name.split(' ')[0];
  return (
    <>
      <Zoom in unmountOnExit>
        <Fab
          aria-label="chat"
          color="primary"
          size="medium"
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            position: ['fixed', 'absolute'],
            bottom: 8,
            right: 8,
            m: 1,
          }}
        >
          <ChatIcon />
        </Fab>
      </Zoom>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Stack height={'72vh'}>
          <Stack
            direction="row"
            alignItems="center"
            px={2}
            flex="0 0 auto"
            bgcolor="primary.main"
            color="primary.contrastText"
          >
            <ListItem component="div" disableGutters sx={{ py: 0.25 }}>
              <Badge
                variant="dot"
                color="accent"
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar sx={{ width: 40, height: 40 }}>
                  <Image
                    alt={nutrionist.name}
                    src={nutrionist.image}
                    width={40}
                    height={40}
                    style={{ objectFit: 'fill' }}
                  />
                </Avatar>
              </Badge>
              <ListItemText
                primary={nutrionist.name}
                secondary="Online"
                secondaryTypographyProps={{
                  sx: { opacity: 0.54, color: 'inherit' },
                }}
                sx={{ ml: 2 }}
              />
            </ListItem>
            <IconButton
              color="inherit"
              aria-label="close-popover"
              onClick={handleClose}
              edge="end"
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
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
                  bgcolor="secondary.main"
                  color="secondary.contrastText"
                  maxWidth={320}
                  borderRadius={1}
                >
                  <Typography variant="body2">
                    Lorem Ipsum has been the industry&apos;s standard dummy text
                    ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book.
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
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged.
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
                  bgcolor="secondary.main"
                  color="secondary.contrastText"
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
                  bgcolor="secondary.main"
                  color="secondary.contrastText"
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
            <Fab
              size="small"
              aria-label="send"
              color="primary"
              sx={{ boxShadow: 'none' }}
            >
              <SendIcon />
            </Fab>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default Chat;
