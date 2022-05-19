import * as sinon from 'sinon';
import { expect } from 'chai';
import TaskController from '../../../controllers/TaskController'; 
import ServiceError from './../../../interfaces/ServiceErrorInterface';
import { createdTask, errorTask } from '../../mocks/MockTask';
import { mockRequest, mockResponse } from './../../mocks/MockReqRes';

const taskController = new TaskController();

describe('Tests in TaskController', () => {
  describe('Tests in create function', async () => {

    before(() => {
      sinon.stub(taskController.service, 'create')
      .onCall(0).resolves(null)
      .onCall(1).resolves({ error: {} } as ServiceError)
      .onCall(2).resolves(createdTask)
    })

    after(()  => {
      sinon.restore();
    })

    describe('When there isn\'t a requisition', async () => {
      const req = mockRequest(null) as any;
      const res = mockResponse() as any;

      it('should return a 500 status code', async () => {
        await taskController.create(req, res);
        expect(res.status.calledWith(500)).to.be.equal(true);
      })
    })

    describe('When there is a invalid requisition', async () => {
      const req = mockRequest(errorTask) as any;
      const res = mockResponse() as any;

      it('should return a error', async () => {
        await taskController.create(req, res);
        expect(res.json.calledWith({ error: {}})).to.be.equal(true);
      })

      it('should return a 400 status code', async () => {
        await taskController.create(req, res);
        expect(res.status.calledWith(400)).to.be.equal(true);
      })
    })

    describe('When there is a valid requisition', async () => {
      const req = mockRequest(createdTask) as any;
      const res = mockResponse() as any;
      
      it('should return a task', async () => {
        await taskController.create(req, res);
        expect(res.json.calledWith(createdTask)).to.be.equal(true);
      })

      it('should return a 201 status code', async () => {
        await taskController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      })
    })
  })

})