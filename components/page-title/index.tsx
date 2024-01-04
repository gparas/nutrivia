import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

const PageTitle = ({ ...other }: TypographyProps) => {
  return <Typography component="h1" variant="h5" fontWeight={600} {...other} />;
};

export default PageTitle;
