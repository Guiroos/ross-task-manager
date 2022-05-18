import { Model } from '../interfaces/ModelInterface';
import { ServiceError } from '../interfaces/ServiceErrorInterface';

export default abstract class Service<T> {
  constructor(public model: Model<T>) { }

  public async create(data: T): Promise<T | null | ServiceError> {
    return this.model.create(data);
  }
}
