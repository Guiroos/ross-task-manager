import Service from '.';
import { Task, TaskSchema } from '../interfaces/TaskInterface';
import { ServiceError } from '../interfaces/ServiceErrorInterface';
import TaskModel from '../models/TaskModel';

class TaskService extends Service<Task> {
  constructor(model = new TaskModel()) {
    super(model);
  }

  create = async (data: Task): Promise<Task | null | ServiceError> => {
    const parsed = TaskSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    } return this.model.create(data);
  };
}

export default TaskService;