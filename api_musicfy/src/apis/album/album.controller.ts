import albumModel from './album.model';
import { Request, Response } from 'express';
import { systemDecorator } from '../../decorators';
import { createAlbumDto } from './album.dto';
const { countInstances } = systemDecorator;

import { errors } from '@errors';
const createError = errors(':: AlbumController ::');

import { readFileStream } from '@middlewares/streams/readFile';

@countInstances
class CreateAlbum {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    const { body } = this._req;

    const data = createAlbumDto(body);

    await albumModel.createAlbum(data);

    return this._res.status(201).end();
  }
}

@countInstances
class GetAlbums {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    try {
      // lack validate type de carateres query
      const {
        query: { page, limit }
      } = this._req;

      const res_page = parseInt((page || 0).toString(), 10);
      const res_limit = parseInt((limit || 10).toString(), 10);

      const users = await albumModel.getAlbums(res_page, res_limit);

      return this._res.json(users);
    } catch (error) {
      this._next(error);
    }
  }
}

@countInstances
class GetAlbum {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    // lack validate type de carateres query
    try {
      // const {
      //   params: { id },
      //   body
      // } = this._req;
      // const user = await albumModel.getAlbumForId(id);
      // if (!user) throw new createError.DataNotFound({ name: 'Album' });

      // const response = userDto.single(user);
      const range = this._req?.headers?.range;
      const response: { headers; fnReadStream } = await readFileStream(
        `${__dirname}/files/test.mp4`,
        range
      );

      this._res.writeHead(206, response.headers);
      response.fnReadStream.pipe(this._res);
    } catch (error) {
      this._next(error);
    } finally {
      // METRICS
    }
  }
}

@countInstances
class GetAlbumBy {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    try {
      // lack validate type de carateres query
      const { params } = this._req;
      const user = await albumModel.getAlbum({ ...params });

      return this._res.json(user).end();
    } catch (error) {
      this._next(error);
    } finally {
      // METRICS
    }
  }
}

@countInstances
class DeleteAlbum {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    try {
      const {
        params: { id }
      } = this._req;

      const result = await albumModel.deleteAlbum(id);
      return this._res.sendStatus(204).end();
    } catch (error) {
      this._next(error);
    }
  }
}

@countInstances
class UpdateAlbum {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    try {
      const {
        body: { username, email },
        params: { id }
      } = this._req;

      if (!username || !email) return this._res.sendStatus(400).end();

      await albumModel.getAlbum(id);

      await albumModel.updateAlbum(id, {
        username: username,
        email: email
      });

      return this._res.sendStatus(204).end();
    } catch (error) {
      this._next(error);
    }
  }
}

export {
  CreateAlbum,
  DeleteAlbum,
  GetAlbum,
  GetAlbumBy,
  GetAlbums,
  UpdateAlbum
};
