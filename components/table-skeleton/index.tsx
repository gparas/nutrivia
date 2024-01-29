import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Card from '../card';
import Typography from '@mui/material/Typography';

const TableSkeleton = () => {
  const data = [...Array(5).keys()];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {data.map(item => (
              <TableCell key={item}>
                <Skeleton width={56} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow
              key={item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {data.map(item => (
                <TableCell key={item}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TableSkeletonCard = () => (
  <Card p={1}>
    <Typography variant="h6" p={1}>
      <Skeleton width={80} />
    </Typography>
    <TableSkeleton />
  </Card>
);

export { TableSkeleton, TableSkeletonCard };
