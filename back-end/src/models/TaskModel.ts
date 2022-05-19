import { Schema, model as createModel, Document } from 'mongoose';
import { Task } from '../interfaces/TaskInterface';
import MongoModel from '.';

export interface TaskDocument extends Task, Document { }

export const TaskSchema = new Schema<TaskDocument>({
  title: String,
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
}, { versionKey: false });

// Referencia para voltar no JSON uma key id = https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
TaskSchema.set('toJSON', {
  virtuals: true,
});

export default class TaskModel extends MongoModel<Task> {
  constructor(model = createModel('tasks', TaskSchema)) {
    super(model);
  }
}
