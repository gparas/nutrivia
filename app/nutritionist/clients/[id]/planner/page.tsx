import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import Drawer from './drawer';
import Meal from './meal';
import AddMeal from './add-meal';
import { MEALS } from './constants';

const MealPlannerpage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals_plan, error } = await supabase
    .from('meals_plan')
    .select(
      `
    day,
    category,
    foods (*)
  `,
    )
    .eq('user_id', id);

  if (error) throw error;

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        pb={2}
        width="100%"
        flex="1 1 auto"
        sx={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map(index => (
          <Card
            key={index}
            flex="1 1 auto"
            minWidth={276}
            spacing={2}
            sx={{ scrollSnapAlign: 'center' }}
          >
            <Typography variant="h6">Day {index}</Typography>
            {MEALS.map(({ id, label }) => {
              const meal = meals_plan
                .filter(meal => meal.day === index)
                .find(meal => meal.category === id)?.foods;

              return (
                <div key={id}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    component="div"
                    mb={0.5}
                  >
                    {label}
                  </Typography>
                  {meal ? (
                    <Meal day={index} meal={meal} />
                  ) : (
                    <AddMeal day={index} label={label} category={id} />
                  )}
                </div>
              );
            })}
          </Card>
        ))}
      </Stack>
      <Drawer user_id={id} />
    </>
  );
};

export default MealPlannerpage;
