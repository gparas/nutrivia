'use client';

import { useCallback, useState } from 'react';
import { GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Card from '@/components/card';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/ErrorOutline';
import ComponentLoader from '@/components/component-loader';
import dayjs from 'dayjs';
import Dialog from '../dialog';
import AdjustMealsForm from './form';

const DataGrid = dynamic(
  () =>
    import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })),
  {
    loading: () => <ComponentLoader height={360} />,
    ssr: false,
  },
);

const getColumns = (user_id: string | undefined) => {
  function RenderName(props: GridRenderCellParams) {
    const { value, row } = props;
    return (
      <Link
        color="inherit"
        variant="body2"
        component={NextLink}
        href={`/foods/ordered/${row.meal_id}?user_id=${user_id}`}
      >
        {value}
      </Link>
    );
  }
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
  function RenderStatus(props: GridRenderCellParams) {
    const { value, row } = props;
    const kcalDiff = row.kcal - value;
    const label = kcalDiff <= 0 ? 'on target' : 'exceeded';
    const icon = kcalDiff <= 0 ? <CheckIcon /> : <WarningIcon />;
    const color = kcalDiff <= 0 ? 'success' : 'warning';
    return (
      <Chip
        size="small"
        variant="outlined"
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
  showEditCta?: boolean;
  profile?: Tables<'profiles'>;
  meals: {
    meal_id?: string;
    image?: string;
    name?: string;
    category?: string;
    kcal?: string;
    carbs?: string;
    protein?: string;
    fat?: string;
  }[];
};

const MealsTable = ({ meals, user_id, showEditCta, profile }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const rows: GridRowsProp = meals;
  return (
    <>
      <Card p={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={500} p={1}>
            Meals
          </Typography>
          {showEditCta && profile && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClickOpen}
                sx={{ fontWeight: 400 }}
              >
                Adjust Meals
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <AdjustMealsForm onClose={handleClose} profile={profile} />
              </Dialog>
            </>
          )}
        </Stack>
        <DataGrid rows={rows} columns={getColumns(user_id)} />
      </Card>
    </>
  );
};

export default MealsTable;
