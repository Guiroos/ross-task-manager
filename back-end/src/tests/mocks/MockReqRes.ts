import sinon from 'sinon';
import { Response } from 'express';

export const mockRequest = (body: any) => ({
  body,
});

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
}; 