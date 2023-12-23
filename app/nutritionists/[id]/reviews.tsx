import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { REVIEWS } from './constants';
import { Fragment } from 'react';
import Button from '@mui/material/Button';

const Reviews = ({ rating }: { rating?: number | null }) => {
  return (
    <>
      <Typography variant="h6" mb={2}>
        Summary
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Typography variant="h4">{rating}</Typography>
        <Rating
          size="small"
          defaultValue={rating || 0}
          precision={0.1}
          readOnly
        />
        <Typography variant="caption" color="text.secondary">
          11 reviews
        </Typography>
      </Stack>
      <List sx={{ '& .MuiDivider-root:last-child': { display: 'none' } }}>
        {REVIEWS.map(review => (
          <Fragment key={review.name}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{review.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={review.name}
                secondary={
                  <>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        {review.total_reviews} reviews
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating
                          size="small"
                          defaultValue={review.rating}
                          precision={0.5}
                          readOnly
                        />
                        <Typography variant="caption" color="text.secondary">
                          {review.created}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontSize: 13 }}>
                        {review.text}
                      </Typography>
                    </Stack>
                  </>
                }
              />
            </ListItem>
            <Divider light variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <Button variant="text" color="inherit" fullWidth>
        Load more
      </Button>
    </>
  );
};

export default Reviews;
