import { Request, Response } from 'express';
import { ControllerErrors } from '../enums';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(req: RequestWithBody<T>, res: Response): Promise<typeof res | void>;
}
