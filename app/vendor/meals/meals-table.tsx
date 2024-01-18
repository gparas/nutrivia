'use client';

import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/card';
import { priceFormat } from '@/lib/utils';

const getColumns = () => {
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
  function RenderPrice(props: GridRenderCellParams) {
    const { value } = props;
    return priceFormat(Number(value));
  }

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
      minWidth: 160,
      flex: 1,
    },
    { field: 'category', headerName: 'category', minWidth: 100, flex: 1 },
    {
      field: 'kcal',
      headerName: 'calories',
      minWidth: 80,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'price',
      renderCell: RenderPrice,
    },
  ];
};

const MealsTable = ({ meals }: { meals: Tables<'foods'>[] }) => {
  const rows: GridRowsProp = meals;
  return (
    <Card p={1}>
      <DataGrid
        rows={rows}
        columns={getColumns()}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
      />
    </Card>
  );
};

export default MealsTable;
