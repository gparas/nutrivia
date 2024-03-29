import { BackdropProps, ButtonOwnProps, ChipOwnProps, Theme } from '@mui/material';

import { alpha } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { gridClasses } from '@mui/x-data-grid';

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      colorDefault: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme, ownerState }: { theme: Theme, ownerState: BackdropProps }) => ({
        backgroundColor: alpha(theme.palette.common.black, 0.8),
        ...(ownerState.invisible && {
          backgroundColor: 'transparent',
        }),
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: theme.shape.borderRadius,
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: theme.shape.borderRadius,
        },
      }),
    },
  },
  MuiDivider: {
    defaultProps: {
      light: true,
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiTextField: {
    defaultProps: {
      color: 'secondary' as const,
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({
        theme,
        ownerState,
      }: {
        theme: Theme;
        ownerState: ButtonOwnProps;
      }) => ({
        ...(ownerState.variant === 'soft' &&
          ownerState.color !== 'inherit' &&
          ownerState.color !== undefined && {
            color: theme.palette[ownerState.color].dark,
            backgroundColor: theme.palette[ownerState.color].light,
            '&:hover': {
              backgroundColor: alpha(
                theme.palette[ownerState.color].main,
                0.18,
              ),
            },
          }),
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({
        theme,
        ownerState,
      }: {
        theme: Theme;
        ownerState: ChipOwnProps;
      }) => ({
        ...(ownerState.color && ownerState.color !== 'default' && {
          backgroundColor: theme.palette[ownerState.color].light,
          color: theme.palette[ownerState.color].dark,
        }),
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      rail: ({ theme }: { theme: Theme }) => {
        return {
          backgroundColor: theme.palette.text.primary,
          opacity: 0.2,
        };
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => {
        return {
          borderColor: alpha(theme.palette.text.primary, 0.08),
        };
      },
    },
  },
  MuiDataGrid: {
    defaultProps: {
      autoHeight: true,
      disableRowSelectionOnClick: true,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      pageSizeOptions: [5],
      initialState: {
        pagination: {
          paginationModel: {
            pageSize: 5,
            page: 0,
          },
        },
      },
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        border: 0,
        [`& .${gridClasses.withBorderColor}`]: {
          borderColor: alpha(theme.palette.text.primary, 0.08),
        },
        [`& .${gridClasses.columnSeparator}`]: {
          display: 'none',
        },
        [`& .${gridClasses.columnHeader}`]: {
          color: theme.palette.text.secondary,
          '&:focus': {
            outline: 'none',
          },
        },
        '& a': {
          textUnderlineOffset: 3,
          textDecorationThickness: '1%',
        },
      }),
    },
  },
};

export default components;
