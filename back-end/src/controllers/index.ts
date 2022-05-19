import { Request, Response } from 'express';
import { ControllerErrors, Status } from '../enums';
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

  constructor(public service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const result = await this.service.read();
      return res.status(Status.OK).json(result);
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json({ error: ControllerErrors.internal });
    }
  };

  readOne = async (
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const result = await this.service.readOne(req.params.id);
      if (!result) {
        return res.status(Status.NOT_FOUND).json({ error: ControllerErrors.notFound });
      }
      if ('error' in result) {
        return res.status(Status.BAD_REQUEST).json({ error: ControllerErrors.invalidId });
      }
      return res.status(Status.OK).json(result);
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json({ error: ControllerErrors.internal });
    }
  };

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void>;

  abstract delete(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void>;
}
