import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Breakfast = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 48 48" {...props}>
      <path d="M2,36c0,4.122,11.4,6,22,6s22-1.878,22-6V14H2Z" fill="#c6a279" />
      <path
        d="M24,26C13.4,26,2,24.122,2,20a1,1,0,0,1,2,0c0,1.357,7.06,4,20,4s20-2.643,20-4a1,1,0,0,1,2,0C46,24.122,34.6,26,24,26Z"
        fill="#a67c52"
      />
      <path
        d="M24,32C13.4,32,2,30.122,2,26a1,1,0,0,1,2,0c0,1.357,7.06,4,20,4s20-2.643,20-4a1,1,0,0,1,2,0C46,30.122,34.6,32,24,32Z"
        fill="#a67c52"
      />
      <path
        d="M24,38C13.4,38,2,36.122,2,32a1,1,0,0,1,2,0c0,1.357,7.06,4,20,4s20-2.643,20-4a1,1,0,0,1,2,0C46,36.122,34.6,38,24,38Z"
        fill="#a67c52"
      />
      <path
        d="M24,8C13.4,8,2,9.878,2,14c0,2.944,5.816,4.742,13,5.53V36a3,3,0,0,0,6,0V19.95c1,.033,2,.05,3,.05,10.6,0,22-1.878,22-6S34.6,8,24,8Z"
        fill="#87613e"
      />
      <path
        d="M28,4H20a4,4,0,0,0-4,4v5a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A4,4,0,0,0,28,4Z"
        fill="#e6e6e6"
      ></path>
    </SvgIcon>
  );
};

export default Breakfast;
