'use client';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Card from '@/components/card';

function RenderImage(props: GridRenderCellParams) {
  const { value } = props;
  return <Image alt={'food'} src={value} priority width={48} height={48} />;
}

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'image',
    maxWidth: 72,
    renderCell: RenderImage,
    sortable: false,
  },
  { field: 'name', headerName: 'name', minWidth: 200, flex: 1 },
  { field: 'category', headerName: 'category', minWidth: 120, flex: 1 },
  {
    field: 'kcal',
    headerName: 'calories',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'carbs',
    headerName: 'carbs',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'protein',
    headerName: 'protein',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'fat',
    headerName: 'fat',
    minWidth: 120,
    flex: 1,
  },
];

type Props = {
  meals: {
    image?: string;
    name?: string;
    category?: string;
    kcal?: number;
    carbs?: number;
    protein?: number;
    fat?: number;
  }[];
};

const MealsTable = ({ meals }: Props) => {
  const rows: GridRowsProp = meals;
  return (
    <Card p={1}>
      <Typography variant="h6" fontWeight={500} p={1}>
        Meals
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        pagination
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        sx={{
          border: 0,
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'divider',
          },
        }}
      />
    </Card>
  );
};

export default MealsTable;
