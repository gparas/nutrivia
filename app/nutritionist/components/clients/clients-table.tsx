'use client';

import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { getYearsOld } from '@/lib/utils';
import { PROFILE } from '@/lib/constants';
import { Tables } from '@/types/supabase';
import { TableSkeleton } from '@/components/table-skeleton';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  },
);

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
  return <DataGrid rows={rows} columns={columns} />;
};

export default ClientsTable;
