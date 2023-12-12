'use client';

import { PieChart } from '@mui/x-charts/PieChart';
import palette from '@/themeRegistry/palette';

interface Props {
  data: {
    label: string;
    value: number;
    color: string;
    kcal: number;
    gram: number;
  }[];
}

interface Palette {
  carbs: {
    main: string;
  };
  proteins: {
    main: string;
  };
  fats: {
    main: string;
  };
}

interface Data {
  value: number;
  label: string;
  color: string;
}

const Chart = ({ data }: Props) => {
  const seriesData = data.map(({ label, value, color }: Data) => ({
    label,
    value,
    color: palette[color as keyof Palette].main,
  }));
  return (
    <PieChart
      series={[
        {
          innerRadius: 80,
          outerRadius: 104,
          data: seriesData,
        },
      ]}
      height={300}
      margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
      tooltip={{
        trigger: 'none',
      }}
    />
  );
};

export default Chart;
