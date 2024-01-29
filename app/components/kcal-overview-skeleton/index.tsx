import Card from '@/components/card';
import ComponentLoader from '@/components/component-loader';

const KcalOverviewSkeleton = () => {
  return (
    <Card py={3} bgcolor="primary.main" color="primary.contrastText">
      <ComponentLoader height={300} />
    </Card>
  );
};

export default KcalOverviewSkeleton;
