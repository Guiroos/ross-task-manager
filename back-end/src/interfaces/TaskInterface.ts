import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  createdAt: z.date().optional(),
  startedAt: z.string().optional(),
  finishedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
