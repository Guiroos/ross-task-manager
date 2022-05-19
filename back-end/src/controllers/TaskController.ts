/* eslint-disable no-underscore-dangle */
import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import TaskService from '../services/TaskService';
import { Task } from '../interfaces/TaskInterface';
import { ControllerErrors, Status } from '../enums';

class TaskController extends Controller<Task> {
  private _route: string;

  constructor(service = new TaskService(), route = '/tasks') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const task = await this.service.create(req.body);
      if (!task) {
        return res.status(Status.INTERNAL_SERVER_ERROR)
          .json({ error: ControllerErrors.internal });
      }
      if ('error' in task) {
        return res.status(Status.BAD_REQUEST)
          .json(task);
      }
      return res.status(Status.CREATED).json(task);
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json({ error: ControllerErrors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const task = await this.service.update(req.params.id, req.body);
      if (!task) {
        return res.status(Status.NOT_FOUND)
          .json({ error: ControllerErrors.notFound });
      }
      if ('error' in task) {
        return res.status(Status.BAD_REQUEST)
          .json(task);
      }
      return res.status(Status.OK).json(task);
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json({ error: ControllerErrors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const task = await this.service.delete(req.params.id);
      if (!task) {
        return res.status(Status.NOT_FOUND)
          .json({ error: ControllerErrors.notFound });
      }
      if ('error' in task) {
        return res.status(Status.BAD_REQUEST)
          .json(task);
      }
      return res.status(Status.OK).json(task);
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json({ error: ControllerErrors.internal });
    }
  };
}

export default TaskController;
