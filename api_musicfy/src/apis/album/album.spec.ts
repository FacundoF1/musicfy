import request from 'supertest';
import { app } from '@app';

import { TestTool } from '@utils/index';
import albumDao from './album.dao';
import albumModel from './album.model';
import { CreateAlbum, DeleteAlbum, GetAlbumBy } from './album.controller';
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
      const result = await albumDao.create({ _id: 1 });

      expect(result).toEqual(true);
    });

    test('201: create album. Return without content', async () => {
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

    test('201: post album. Return without content', async () => {
      const response = await request(app)
        .post(`/albums`)
        .send({
          name: 'resource',
          year: 2022,
          url: 'resource',
          artistId: 'resource'
        })
        .expect(201);
    });

    test('400: post album. Validators return error', async () => {
      const response = await request(app)
        .post(`/albums`)
        .send({
          name: 'resource',
          year: 'resource',
          url: 'resource'
        })
        .expect(400);
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

  describe('Read All', () => {
    test('Unit: db getAll', async () => {
      const result = await albumDao.getAlls(0, 3, {});

      expect(result).toEqual([
        {
          name: 'sin igual',
          year: '2023',
          url: 'http://www.google.com',
          _id: 'testDb'
        }
      ]);
    });

    test('200: get albums', async () => {
      const response = await request(app).get(`/albums`).expect(200);

      expect(response).toHaveProperty('body', [
        {
          name: 'sin igual',
          year: '2023',
          url: 'http://www.google.com',
          _id: 'testDb'
        }
      ]);
    });

    test('500: get albums. Return error server', async () => {
      await request(app).get(`/albums?page=1`).expect(500);
    });
  });

  describe('Update', () => {
    test('Unit: db update', async () => {
      const result = await albumDao.update({ _id: 'testDb' }, { year: 2028 });

      expect(result).toEqual([
        {
          name: 'sin iguals',
          year: 2028,
          url: 'http://www.google.com',
          artistId: 'acc-12345675',
          status: 'active',
          _id: '5edbFYN5Q5kXdZlW'
        }
      ]);
    });

    test('200: update album', async () => {
      const response = await request(app)
        .put(`/albums`)
        .send({
          year: 2028,
          _id: '5edbFYN5Q5kXdZlW'
        })
        .expect(204);

      expect(response).toHaveProperty('body');
    });

    test('400: update album', async () => {
      const response = await request(app)
        .put(`/albums`)
        .send({
          year: 2028
        })
        .expect(400);
    });
  });

  describe('Delete', () => {
    test('Unit: db update', async () => {
      const result = await albumDao.update(
        { _id: 'testDbdelete' },
        { status: 'inactive' }
      );

      expect(result).toEqual(null);
    });

    test('204: delete album', async () => {
      const response = await request(app)
        .delete(`/albums/5edbFYN5Q5kXdZlW`)
        .expect(204);

      expect(response).toHaveProperty('body');
    });

    test('404: delete album', async () => {
      const req = testTool.mockRequest({}, {}, { _id: 'errorTest' });
      const res = testTool.mockResponse();
      const next = testTool.mockNext(
        new createError.DeleteError({ detail: 'Album' })
      );

      await new DeleteAlbum(req, res, next).handleRequest();

      const error = new createError.DeleteError({ detail: 'Album' });

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Album Model', () => {
    test('getAlbums', async () => {
      const getAlbums = await albumModel.getAlbums(1, 1, {});
      expect(getAlbums).toBe(null);
    });

    test('getAlbum', async () => {
      const getAlbum = await albumModel.getAlbum('data');
      expect(getAlbum).toBe(null);
    });
    test('createAlbum', async () => {
      const createAlbum = await albumModel.createAlbum('data');
      expect(createAlbum).toBe(null);
    });
    test('updateAlbum', async () => {
      const updateAlbum = await albumModel.updateAlbum('id', {});
      expect(updateAlbum).toBe(null);
    });
    test('deleteAlbum', async () => {
      const deleteAlbum = await albumModel.deleteAlbum('id');
      expect(deleteAlbum).toBe(null);
    });
  });
});
