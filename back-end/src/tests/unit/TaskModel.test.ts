import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import TaskModel from '../../models/TaskModel';
import { newTask, createdTask } from '../mocks/MockTask';

const taskModel = new TaskModel();

describe('Tests in TaskModel', () => {

  before(async () => {
    sinon.stub(Model, 'create').resolves(createdTask);
  });

  after(() => {
    sinon.restore();
  })

  it('Should create a new task', async () => {
    const result = await taskModel.create(newTask);
    expect(result).to.be.deep.equal(createdTask);
  })
});