'use client';

import { PieChart } from '@mui/x-charts/PieChart';

interface Props {
  data: {
    label: string;
    value: number;
    color: string;
    kcal: number;
    gram: number;
  }[];
}

const Chart = ({ data }: Props) => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 80,
          outerRadius: 104,
          data,
        },
      ]}
      height={300}
      margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
    />
  );
};

export default Chart;
