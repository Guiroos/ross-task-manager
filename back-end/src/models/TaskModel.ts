import { Schema, model as createModel, Document } from 'mongoose';
import { Task } from '../interfaces/TaskInterface';
import MongoModel from '.';

interface TaskDocument extends Task, Document { }

const TaskSchema = new Schema<TaskDocument>({
  title: String,
  description: String,
  status: String,
});

export default class TaskModel extends MongoModel<Task> {
  constructor(model = createModel('tasks', TaskSchema)) {
    super(model);
  }
}
