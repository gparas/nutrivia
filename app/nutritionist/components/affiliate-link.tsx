'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CopyIcon from '@mui/icons-material/ContentCopy';

const AffiliateLink = () => {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 1, display: 'flex', alignItems: 'center', maxWidth: '100%' }}
    >
      <Typography variant="body2" color="text.secondary" mx={1} noWrap>
        https://nutrivia.vercel.app/369b06ab
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<CopyIcon />}
        sx={{ flexGrow: 1, minWidth: 160, whiteSpace: 'nowrap' }}
      >
        Copy Affiliate Link
      </Button>
    </Paper>
  );
};

export default AffiliateLink;
