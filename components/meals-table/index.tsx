'use client';

import { GridRenderCellParams } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import ComponentLoader from '@/components/component-loader';
import dayjs from 'dayjs';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <ComponentLoader height={360} />,
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
      field: 'kcal',
      headerName: 'calories',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'date',
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

const MealsTable = ({ rows }: Props) => {
  return <DataGrid rows={rows} columns={getColumns()} />;
};

export default MealsTable;
