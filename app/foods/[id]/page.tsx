import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Container from '@mui/material/Container';
import Card from '@/components/card';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import SubmitFormButton from '@/components/submit-form-button';
import BackButton from '@/components/back-button';
import { priceFormat } from '@/lib/utils';
import { submit } from './actions';

const MealPage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase.from('foods').select().match({ id });

  const food = foods?.find(food => food.id === id);

  if (!food) {
    return notFound();
  }

  const { data: meals } = await supabase
    .from('meals')
    .select('meal_id')
    .eq('created_at', dayjs().format());

  const ordered = meals?.find(({ meal_id }) => meal_id === food.id);

  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Card p={0}>
        <Box
          position="relative"
          overflow="hidden"
          pt="66.6667%"
          width="100%"
          flex="0 0 auto"
        >
          <Image
            fill
            alt={food.name}
            src={food.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box p={2} flex="1 1 auto">
          <Typography variant="overline" color="text.secondary">
            {food.category}
          </Typography>
          <Typography variant="h5" mb={2} fontWeight={500}>
            {food.name}
          </Typography>
          <Typography variant="body2" mb={3}>
            {food.description}
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} mb={1}>
            Nutritional information
          </Typography>
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Kcal"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.kcal}kcal
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Carbs"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.carbs}g
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Protein"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.protein}g
              </Typography>
            </ListItem>
            <Divider component="li" light />
            <ListItem disableGutters>
              <ListItemText
                primary="Fat"
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" fontWeight={500} component="span">
                {food.fat}g
              </Typography>
            </ListItem>
          </List>
        </Box>
        {!ordered && (
          <Box
            p={2}
            flex="0 0 auto"
            textAlign="center"
            component="form"
            action={submit}
          >
            <input type="hidden" name="meal_id" defaultValue={food.id} />
            <input
              type="hidden"
              name="meal_category"
              defaultValue={food.category}
            />
            <SubmitFormButton>
              Order now {priceFormat(food.price)}
            </SubmitFormButton>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default MealPage;
