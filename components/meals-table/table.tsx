'use client';

import { GridRenderCellParams } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import dayjs from 'dayjs';
import { TableSkeleton } from '../table-skeleton';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  },
);
function RenderName(props: GridRenderCellParams) {
  const { value, row } = props;
  return (
    <Link
      color="inherit"
      variant="body2"
      component={NextLink}
      href={`/orders/${row.meal_id}?user_id=${row.user_id}`}
    >
      {value}
    </Link>
  );
}
function RenderImage(props: GridRenderCellParams) {
  const { value, row } = props;
  return (
    <Avatar
      variant="rounded"
      sx={{
        width: 48,
        height: 48,
        position: 'relative',
        bgcolor: 'transparent',
      }}
    >
      <Image
        alt={row.name}
        src={value}
        priority
        width={48}
        height={48}
        style={{ objectFit: 'cover' }}
      />
    </Avatar>
  );
}
function RenderDate(props: GridRenderCellParams) {
  const { value } = props;
  return dayjs(value).format('DD MMM YY');
}

const getColumns = () => {
  return [
    {
      field: 'image',
      headerName: 'image',
      maxWidth: 80,
      renderCell: RenderImage,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'name',
      renderCell: RenderName,
      minWidth: 210,
      flex: 1,
    },
    {
      field: 'kcal',
      headerName: 'calories',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'ordered at',
      renderCell: RenderDate,
      minWidth: 120,
      flex: 1,
    },
    { field: 'category', headerName: 'category', minWidth: 120, flex: 1 },
  ];
};

interface Props {
  rows: {
    id: string | number;
    image?: string;
    name?: string;
    kcal?: string;
    created_at?: string;
    category?: string;
  }[];
}

const Table = ({ rows }: Props) => {
  return <DataGrid rows={rows} columns={getColumns()} />;
};

export default Table;
