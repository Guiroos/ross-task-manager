import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
