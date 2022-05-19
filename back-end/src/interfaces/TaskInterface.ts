import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
