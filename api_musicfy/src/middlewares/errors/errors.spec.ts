import { errorResponseDto } from './errors.dto';
import { errorHandler } from './errors.middleware';
import { TestTool } from '@utils/index';
const testTool = TestTool(errorHandler);

import { errors } from '@utils/errors.common';
const createError = errors(':: Album Errors ::');

describe('Error response dto', () => {
  test('Should return object with satineze error', (done) => {
    const response = errorResponseDto({
      message: 'Error dto test',
      testError: ''
    });

    expect(response).toEqual({ message: 'Error dto test' });
  });

  test('Should return object with satineze error 403', async () => {
    const responseDto = errorResponseDto({
      message: 'Error dto test',
      testError: ''
    });

    const req = testTool.mockRequest(responseDto);
    const res = testTool.mockResponse();
    const next = testTool.mockNext(null);
    const error = new createError.Forbidden({});

    await errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('Should return object with satineze error 500', async () => {
    const req = testTool.mockRequest();
    const res = testTool.mockResponse();
    const next = testTool.mockNext(null);
    const error = new Error('Test');

    await errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
