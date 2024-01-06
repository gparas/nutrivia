'use client';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/card';
import { getYearsOld } from '@/lib/utils';
import { PROFILE } from '@/lib/constants';
import Button from '@mui/material/Button';
import { Tables } from '@/types/supabase';

function RenderAge(props: GridRenderCellParams) {
  const { value } = props;
  return `${getYearsOld(value)} years`;
}

function RenderHeight(props: GridRenderCellParams) {
  const { value } = props;
  return `${value} cm`;
}

function RenderWeight(props: GridRenderCellParams) {
  const { value } = props;
  return `${value} kg`;
}

function RenderGoal(props: GridRenderCellParams) {
  const { value } = props;
  return PROFILE.goal.options.find(option => option.value === value)?.label;
}

function RenderAvatar(props: GridRenderCellParams) {
  const { value } = props;
  return <Avatar alt="user" src={value} />;
}

function RenderAction(props: GridRenderCellParams) {
  const { value } = props;
  return (
    <Link
      color="inherit"
      component={NextLink}
      href={`/nutritionist/clients/${value}`}
    >
      view profile
    </Link>
  );
}

const columns: GridColDef[] = [
  {
    field: 'avatar_url',
    headerName: '',
    maxWidth: 64,
    renderCell: RenderAvatar,
    sortable: false,
  },
  { field: 'full_name', headerName: 'name', minWidth: 200, flex: 1 },
  { field: 'gender', headerName: 'gender', minWidth: 120, flex: 1 },
  {
    field: 'age',
    headerName: 'age',
    renderCell: RenderAge,
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'height',
    headerName: 'height',
    renderCell: RenderHeight,
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'weight',
    headerName: 'weight',
    renderCell: RenderWeight,
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'goal',
    headerName: 'goal',
    renderCell: RenderGoal,
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'id',
    headerName: 'actions',
    renderCell: RenderAction,
    sortable: false,
  },
];

type Props = {
  profiles: Tables<'profiles'>[];
};

const ClientsTable = ({ profiles }: Props) => {
  const rows: GridRowsProp = profiles;
  return (
    <Card p={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Typography variant="h6" fontWeight={500}>
          Clients
        </Typography>
        <Button
          variant="text"
          color="inherit"
          component={NextLink}
          href="/nutritionist/clients"
        >
          view all
        </Button>
      </Stack>
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

export default ClientsTable;
