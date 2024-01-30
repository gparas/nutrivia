import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';

const UserExtraInfo = () => {
  return (
    <Card px={0} maxHeight={452}>
      <Typography variant="h6" px={2} gutterBottom>
        Extra info
      </Typography>
      <Box flex="1 1 auto" sx={{ overflowY: 'auto' }}>
        <List
          disablePadding
          subheader={
            <ListSubheader sx={{ lineHeight: '40px' }}>
              Body measurements
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemText
              primary="Waist"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Chest"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Arms"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
        </List>
        <List
          disablePadding
          subheader={
            <ListSubheader sx={{ lineHeight: '40px' }}>Health</ListSubheader>
          }
        >
          <ListItem>
            <ListItemText
              primary="Diseases"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Allergies"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">No allergies</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Min weight after 18"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Max weight after 18"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
        </List>
        <List
          disablePadding
          subheader={
            <ListSubheader sx={{ lineHeight: '40px' }}>Other</ListSubheader>
          }
        >
          <ListItem>
            <ListItemText
              primary="Hours of sleep"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Type of employment"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary="Hours of employment"
              primaryTypographyProps={{ variant: 'body2' }}
            />
            <Typography variant="body2">-</Typography>
          </ListItem>
        </List>
      </Box>
    </Card>
  );
};

export default UserExtraInfo;
