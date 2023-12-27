import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';

const EmptyIcon = () => {
  return (
    <SvgIcon viewBox="0 0 180 180" sx={{ fontSize: 180 }} color="inherit">
      <ellipse opacity="0.05" cx="90" cy="174.6" rx="90" ry="5.4" />
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.1996 45.0001C43.1996 39.0354 48.0349 34.2001 53.9996 34.2001H104.323C104.678 34.2001 105.031 34.2175 105.38 34.2519V58.4197C105.38 62.3962 108.604 65.6197 112.58 65.6197H135V110.38C133.26 110 131.453 109.8 129.6 109.8C115.682 109.8 104.4 121.083 104.4 135C104.4 139.12 105.388 143.009 107.141 146.443H53.9996C48.0349 146.443 43.1996 141.608 43.1996 135.643V45.0001ZM109.38 150.043H53.9996C46.0467 150.043 39.5996 143.596 39.5996 135.643V45.0001C39.5996 37.0472 46.0467 30.6001 53.9996 30.6001H104.323C108.143 30.6001 111.805 32.1172 114.506 34.8178L134.382 54.694C137.082 57.3945 138.6 61.0572 138.6 64.8763V65.4917L138.6 65.6197H138.6V111.455C148.073 115.078 154.8 124.253 154.8 135C154.8 148.918 143.517 160.2 129.6 160.2C121.32 160.2 113.974 156.208 109.38 150.043ZM59.9268 56.3273C60.6298 55.6244 61.7695 55.6244 62.4724 56.3273L68.8496 62.7045L75.2268 56.3273C75.9298 55.6244 77.0695 55.6244 77.7724 56.3273C78.4753 57.0303 78.4753 58.1699 77.7724 58.8729L71.3952 65.2501L77.7724 71.6273C78.4753 72.3303 78.4753 73.4699 77.7724 74.1729C77.0695 74.8758 75.9298 74.8758 75.2268 74.1729L68.8496 67.7957L62.4724 74.1729C61.7695 74.8758 60.6298 74.8758 59.9268 74.1729C59.2239 73.4699 59.2239 72.3303 59.9268 71.6273L66.304 65.2501L59.9268 58.8729C59.2239 58.1699 59.2239 57.0303 59.9268 56.3273ZM59.3996 90.9001C59.3996 88.4148 61.4143 86.4001 63.8996 86.4001H90.8996C93.3849 86.4001 95.3996 88.4148 95.3996 90.9001C95.3996 93.3854 93.3849 95.4001 90.8996 95.4001H63.8996C61.4143 95.4001 59.3996 93.3854 59.3996 90.9001ZM63.8996 90.0001C63.4026 90.0001 62.9996 90.403 62.9996 90.9001C62.9996 91.3972 63.4026 91.8001 63.8996 91.8001H90.8996C91.3967 91.8001 91.7996 91.3972 91.7996 90.9001C91.7996 90.403 91.3967 90.0001 90.8996 90.0001H63.8996ZM63.8996 100.8C61.4143 100.8 59.3996 102.815 59.3996 105.3C59.3996 107.785 61.4143 109.8 63.8996 109.8H114.3C116.785 109.8 118.8 107.785 118.8 105.3C118.8 102.815 116.785 100.8 114.3 100.8H63.8996ZM62.9996 105.3C62.9996 104.803 63.4026 104.4 63.8996 104.4H114.3C114.797 104.4 115.2 104.803 115.2 105.3C115.2 105.797 114.797 106.2 114.3 106.2H63.8996C63.4026 106.2 62.9996 105.797 62.9996 105.3ZM144.147 45.4064C142.965 43.7289 140.836 43.0044 138.877 43.6126C135.809 44.5644 134.562 48.2304 136.411 50.8559L140.334 56.4242C141.55 58.15 142.208 60.2067 142.22 62.3177L142.258 69.1607C142.272 71.7781 144.404 73.889 147.022 73.8774C149.642 73.8658 151.757 71.7314 151.744 69.1108L151.707 61.6783C151.689 58.0468 150.559 54.5082 148.467 51.5394L144.147 45.4064ZM139.944 47.0508C140.412 46.9054 140.921 47.0787 141.203 47.4797L145.524 53.6127C147.191 55.9796 148.093 58.8008 148.107 61.6961L148.144 69.1286C148.147 69.7602 147.638 70.2747 147.006 70.2774C146.375 70.2802 145.861 69.7715 145.858 69.1406L145.819 62.2976C145.804 59.4512 144.916 56.6779 143.277 54.3509L139.354 48.7826C138.912 48.1549 139.21 47.2784 139.944 47.0508ZM108 135C108 123.071 117.67 113.4 129.6 113.4C141.529 113.4 151.2 123.071 151.2 135C151.2 146.929 141.529 156.6 129.6 156.6C117.67 156.6 108 146.929 108 135ZM125.1 123.3C125.1 120.815 127.114 118.8 129.6 118.8C132.085 118.8 134.1 120.815 134.1 123.3V134.1C134.1 136.585 132.085 138.6 129.6 138.6C127.114 138.6 125.1 136.585 125.1 134.1V123.3ZM129.6 122.4C129.103 122.4 128.7 122.803 128.7 123.3V134.1C128.7 134.597 129.103 135 129.6 135C130.097 135 130.5 134.597 130.5 134.1V123.3C130.5 122.803 130.097 122.4 129.6 122.4ZM129.6 151.2C127.114 151.2 125.1 149.185 125.1 146.7C125.1 144.215 127.114 142.2 129.6 142.2C132.085 142.2 134.1 144.215 134.1 146.7C134.1 149.185 132.085 151.2 129.6 151.2ZM128.7 146.7C128.7 147.197 129.103 147.6 129.6 147.6C130.097 147.6 130.5 147.197 130.5 146.7C130.5 146.203 130.097 145.8 129.6 145.8C129.103 145.8 128.7 146.203 128.7 146.7Z"
      />
    </SvgIcon>
  );
};

export default EmptyIcon;
