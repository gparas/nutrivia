import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Water = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <path
        d="M41,2H7a1,1,0,0,0-1,1.1L9.66,41.474A4.979,4.979,0,0,0,14.637,46H33.363a4.979,4.979,0,0,0,4.977-4.526L42,3.1A1,1,0,0,0,41,2Z"
        fill="#bfdee0"
      />
      <path
        d="M14.637,42H33.362a1,1,0,0,0,.995-.905l1.62-17a1,1,0,0,0-1-1.095H13.018a1,1,0,0,0-1,1.095l1.62,17A1,1,0,0,0,14.637,42Z"
        fill="#43a6dd"
      />
    </SvgIcon>
  );
};

export default Water;
