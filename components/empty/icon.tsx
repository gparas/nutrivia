'use client';

import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const EmptyIcon = ({ ...other }: SvgIconProps) => {
  const theme = useTheme();
  return (
    <SvgIcon viewBox="0 0 48 48" {...other}>
      <path
        fill={theme.palette.primary.main}
        d="M17,8l-4-4H3C1.895,4,1,4.895,1,6v34c0,2.209,1.791,4,4,4h38c2.209,0,4-1.791,4-4V12c0-2.209-1.791-4-4-4H17 z"
      />
      <path
        fill={theme.palette.primary.dark}
        d="M47,14H1V6c0-1.105,0.895-2,2-2h10l4,4h26c2.209,0,4,1.791,4,4V14z"
      />
      <path
        fill={theme.palette.primary.dark}
        d="M24,20c-4.962,0-9,4.037-9,9s4.038,9,9,9s9-4.037,9-9S28.962,20,24,20z M17,29c0-3.859,3.14-7,7-7 c1.57,0,3.015,0.526,4.184,1.402l-9.783,9.783C17.526,32.015,17,30.57,17,29z M24,36c-1.57,0-3.015-0.526-4.184-1.402l9.783-9.783 C30.474,25.985,31,27.43,31,29C31,32.859,27.86,36,24,36z"
      />
    </SvgIcon>
  );
};

export default EmptyIcon;
