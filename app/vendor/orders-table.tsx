'use client';

import { GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@/components/card';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/ErrorOutline';
import { ORDERS } from './constants';
import { TableSkeleton } from '@/components/table-skeleton';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  },
);

function RenderStatus(props: GridRenderCellParams) {
  const { value } = props;
  const icon = value === 'fulfilled' ? <CheckIcon /> : <WarningIcon />;
  const color = value === 'fulfilled' ? 'success' : 'warning';
  return (
    <Chip
      label={value}
      color={color}
      size="small"
      variant="outlined"
      icon={icon}
    />
  );
}

const columns = [
  {
    field: 'id',
    headerName: 'order',
    sortable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'date',
    headerName: 'date',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'items',
    headerName: 'items',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'total',
    headerName: 'total',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'status',
    headerName: 'status',
    renderCell: RenderStatus,
    width: 120,
  },
];

const OrdersTable = () => {
  const rows: GridRowsProp = ORDERS;
  return (
    <Card p={1}>
      <Typography variant="h6" p={1}>
        Orders
      </Typography>
      <DataGrid rows={rows} columns={columns} />
    </Card>
  );
};

export default OrdersTable;
