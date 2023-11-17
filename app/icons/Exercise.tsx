import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Exercise = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <polygon
        points="35.655 34.343 31 12 36.976 9.884 42 34 35.655 34.343"
        fill="#b3b3b3"
      />
      <path d="M42,43H5a4,4,0,0,1,0-8l36.946-2A5,5,0,1,1,42,43Z" fill="#444" />
      <path d="M5,41a2,2,0,0,1,0-4l37.055-2A3,3,0,0,1,42,41Z" fill="#5b5b5b" />
      <path
        d="M25,15a1,1,0,0,1-.316-1.948l11.1-3.7a3.02,3.02,0,0,0,1.173-.726l5.332-5.332a1,1,0,1,1,1.414,1.414l-5.332,5.332a5.017,5.017,0,0,1-1.954,1.208l-11.1,3.7A1,1,0,0,1,25,15Z"
        fill="#444"
      />
      <path
        d="M7,43h3a0,0,0,0,1,0,0v2a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V43A0,0,0,0,1,7,43Z"
        fill="#b3b3b3"
      />
      <path
        d="M37,43h3a0,0,0,0,1,0,0v2a1,1,0,0,1-1,1H38a1,1,0,0,1-1-1V43A0,0,0,0,1,37,43Z"
        fill="#b3b3b3"
      />
      <circle cx="42" cy="38" r="1" fill="#444" />
      <circle cx="4.907" cy="39" r="1" fill="#444" />
    </SvgIcon>
  );
};

export default Exercise;
