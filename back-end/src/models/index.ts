import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  create = async (data: T): Promise<T> => this.model.create({ ...data });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> => this.model.findOne({ _id: id });

  update = async (id: string, data: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id: id }, { ...data });

  delete = async (id: string): Promise<T | null> => {
    const document = await this.model.findOne({ _id: id });
    if (document) await this.model.deleteOne({ _id: id });

    return document;
  };
}

export default MongoModel;
