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
import { alpha } from '@mui/material';

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

function RenderName(props: GridRenderCellParams) {
  const { value, row } = props;
  return (
    <Link
      color="inherit"
      component={NextLink}
      href={`/nutritionist/clients/${row.id}`}
    >
      {value}
    </Link>
  );
}

const columns: GridColDef[] = [
  {
    field: 'avatar_url',
    headerName: 'image',
    maxWidth: 80,
    renderCell: RenderAvatar,
    sortable: false,
  },
  {
    field: 'full_name',
    headerName: 'name',
    renderCell: RenderName,
    minWidth: 200,
    flex: 1,
  },
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
      <DataGrid rows={rows} columns={columns} />
    </Card>
  );
};

export default ClientsTable;
