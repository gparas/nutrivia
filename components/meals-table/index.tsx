'use client';

import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Image from 'next/image';
import Card from '@/components/card';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

const getColumns = (user_id: string | undefined) => {
  function RenderName(props: GridRenderCellParams) {
    const { value, row } = props;
    return (
      <Link
        color="inherit"
        component={NextLink}
        href={`/foods/ordered/${row.meal_id}?user_id=${user_id}`}
      >
        {value}
      </Link>
    );
  }
  function RenderImage(props: GridRenderCellParams) {
    const { value } = props;
    return <Image alt={'food'} src={value} priority width={48} height={48} />;
  }
  function RenderDate(props: GridRenderCellParams) {
    const { value } = props;
    return dayjs(value).format('DD MMM YY');
  }
  function RenderStatus(props: GridRenderCellParams) {
    const { value, row } = props;
    const kcalDiff = row.kcal - value;
    const label = kcalDiff <= 0 ? 'on target' : 'exceeded';
    const icon = kcalDiff <= 0 ? <CheckIcon /> : <CloseIcon />;
    const color = kcalDiff <= 0 ? 'success' : 'error';
    return (
      <Chip
        size="small"
        variant="soft"
        label={label}
        icon={icon}
        color={color}
      />
    );
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
      minWidth: 200,
      flex: 1,
      renderCell: RenderName,
    },
    {
      field: 'kcal',
      headerName: 'calories',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'date',
      renderCell: RenderDate,
      minWidth: 120,
      flex: 1,
    },
    { field: 'category', headerName: 'category', minWidth: 120, flex: 1 },
    {
      field: 'status',
      headerName: 'status',
      renderCell: RenderStatus,
      minWidth: 120,
      flex: 1,
    },
  ];
};

type Props = {
  user_id?: string;
  meals: {
    meal_id?: string;
    image?: string;
    name?: string;
    category?: string;
    kcal?: number;
    carbs?: number;
    protein?: number;
    fat?: number;
  }[];
};

const MealsTable = ({ meals, user_id }: Props) => {
  const rows: GridRowsProp = meals;
  return (
    <Card p={1}>
      <Typography variant="h6" fontWeight={500} p={1}>
        Meals
      </Typography>
      <DataGrid rows={rows} columns={getColumns(user_id)} />
    </Card>
  );
};

export default MealsTable;
