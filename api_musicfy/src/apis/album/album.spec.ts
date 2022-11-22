import { TestTool } from '@utils/index';
import albumDao from './album.dao';
import { CreateAlbum } from './album.controller';
import { errors } from '@utils/errors.common';
const createError = errors(':: Utils Validators ::');

jest.mock('./album.dao');
jest.mock('../../middlewares/streams');

const testTool = TestTool(albumDao);

describe('Album', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('Unit: db create', async () => {
    const result = await albumDao.create({ id: 1 });

    expect(result).toEqual(true);
  });

  test('201: create album. without content', async () => {
    const req = testTool.mockRequest({
      name: 'resource',
      year: 'resource',
      url: 'resource',
      artistId: 'resource'
    });
    const res = testTool.mockResponse();

    await new CreateAlbum(req, res, testTool.mockNext(null)).handleRequest();

    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('400: create album. Return error DataRequired', async () => {
    const req = testTool.mockRequest({
      name: 'resource',
      year: 'resource',
      url: 'resource'
    });
    const res = testTool.mockResponse();
    const next = testTool.mockNext(
      new createError.DataRequired({
        field: 'artistId',
        fn: 'createAlbumReqDto',
        file: 'Album'
      })
    );

    await new CreateAlbum(req, res, next).handleRequest();

    const error = new createError.DataRequired({
      field: 'artistId',
      fn: 'createAlbumReqDto',
      file: 'Album'
    });
    expect(next).toHaveBeenCalledWith(error);
  });

  test('403: create album. Return error Forbidden', async () => {
    const req = testTool.mockRequest({
      name: 'test.Forbidden',
      year: 'resource',
      url: 'resource',
      artistId: 'test.Forbidden'
    });
    const res = testTool.mockResponse();
    const next = testTool.mockNext(
      new createError.Forbidden({ detail: 'Album already createred' })
    );

    await new CreateAlbum(req, res, next).handleRequest();

    const error = new createError.Forbidden({
      detail: 'Album already createred'
    });

    expect(next).toHaveBeenCalledWith(error);
  });
});
