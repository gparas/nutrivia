'use client';

import { Tables } from '@/types/supabase';
import { GridRenderCellParams } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import dayjs from 'dayjs';
import { TableSkeleton } from '../table-skeleton';
import { priceFormat } from '@/lib/utils';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  },
);

function RenderImage(props: GridRenderCellParams) {
  const { value } = props;
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
        alt={'food'}
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
function RenderPrice(props: GridRenderCellParams) {
  const { value } = props;
  return priceFormat(value);
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
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'created at',
      renderCell: RenderDate,
      minWidth: 120,
      flex: 1,
    },
    { field: 'category', headerName: 'category', minWidth: 120, flex: 1 },
    {
      field: 'price',
      headerName: 'price',
      renderCell: RenderPrice,
      minWidth: 120,
      flex: 1,
    },
  ];
};

interface Props {
  rows: Tables<'foods'>[];
}

const Table = ({ rows }: Props) => {
  return <DataGrid rows={rows} columns={getColumns()} />;
};

export default Table;
