import * as sinon from 'sinon';
import { expect } from 'chai';
import TaskService from '../../../services/TaskService';
import { newTask, createdTask, errorTask } from '../../mocks/MockTask';
import { Task } from '../../../interfaces/TaskInterface';

const taskService = new TaskService();

describe('Tests in TaskService', () => {
  describe('Tests in create function', () => {

    before(async () => {
      sinon.stub(taskService.model, 'create').resolves(createdTask);
    });

    after(() => {
      sinon.restore();
    });

    it('Should create a new task when sending a correct object', async () => {
      const result = await taskService.create(newTask);
      expect(result).to.be.deep.equal(createdTask);
    });

    it('Should throw an error when sending an incorrect object', async () => {
      try {
        await taskService.create(errorTask as Task);
      } catch (error) {
        expect(error).to.be.equal({ error: {} });
      }
    })
  })
})