import request from 'supertest';
import { app } from '@app';

import { TestTool } from '@utils/index';
import albumDao from './album.dao';
import { CreateAlbum, GetAlbumBy } from './album.controller';
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

  describe('Create', () => {
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
      const req = testTool.mockRequest({});
      const res = testTool.mockResponse();
      const next = testTool.mockNext(
        new createError.DataRequired({
          field: 'name',
          fn: 'createAlbumReqDto',
          file: 'Album'
        })
      );

      await new CreateAlbum(req, res, next).handleRequest();

      const error = new createError.DataRequired({
        field: 'name',
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

  describe('Read', () => {
    test('Unit: db create', async () => {
      const result = await albumDao.get({ _id: 'testDb' });

      expect(result).toEqual([
        {
          name: 'sin igual',
          year: '2023',
          url: 'http://www.google.com',
          _id: 'testDb'
        }
      ]);
    });

    test('200: get album', async () => {
      const response = await request(app).get(`/albums/testDb`).expect(200);

      expect(response).toHaveProperty('body', {
        name: 'sin igual',
        year: '2023',
        url: 'http://www.google.com',
        _id: 'testDb'
      });
    });

    test('404: get album. Return error DataRequired', async () => {
      const req = testTool.mockRequest({}, { _id: 'test' });
      const res = testTool.mockResponse();
      const next = testTool.mockNext(
        new createError.DataNotFound({
          name: 'Album'
        })
      );

      await new GetAlbumBy(req, res, next).handleRequest();

      const error = new createError.DataNotFound({
        name: 'Album'
      });
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
