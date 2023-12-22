import React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { PARAGRAPH, WORKING_HOURS } from './constants';

const Overview = ({ description }: { description?: string | null }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {description}
      </Typography>
      <Typography variant="body2" mb={4}>
        {PARAGRAPH}
      </Typography>
      <Typography variant="h6" mb={3}>
        Training, qualifications & experience
      </Typography>
      <Typography paragraph variant="body2">
        {PARAGRAPH}
      </Typography>
      <Typography variant="body2" mb={4}>
        {PARAGRAPH}
      </Typography>
      <Typography variant="h6" mb={3}>
        Working hours
      </Typography>
      <Table size="small">
        <TableBody>
          {WORKING_HOURS.map(({ day, time }) => (
            <TableRow key={day}>
              <TableCell width={120} sx={{ border: 0, px: 0 }}>
                {day}
              </TableCell>
              <TableCell sx={{ border: 0, px: 0 }}>{time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Overview;
