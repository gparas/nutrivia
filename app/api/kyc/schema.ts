import { z } from 'zod';

const schema = z.object({
  goal: z.string(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
  activity: z.string(),
  diet: z.string(),
});

export default schema;
