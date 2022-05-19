import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrorInterface';

export default abstract class Service<T> {
  constructor(public model: Model<T>) { }

  public async create(data: T): Promise<T | null | ServiceError> {
    return this.model.create(data);
  }

  public async read(): Promise<T[] | ServiceError> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, data: T): Promise<T | null | ServiceError> {
    return this.model.update(id, data);
  }
}
