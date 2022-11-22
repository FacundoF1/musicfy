// @Vendors

// @Modules
import albumModel from './album.model';
import { Request, Response } from 'express';
import { systemDecorator } from '../../decorators';
import { albumDto } from './album.dto';
const { countInstances } = systemDecorator;

import { errors } from '@utils/errors.common';
const createError = errors(':: AlbumController ::');

import { readFileStream, deleteFile } from '@middlewares/index';
import { AlbumInterface } from './album.interface';

@countInstances
class CreateAlbum {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next: any) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    const { body, file } = this._req;
    const pathId = file?.filename;
    const pathUrlAudio = file?.path;

    try {
      const data = albumDto({
        ...body,
        pathId,
        pathUrlAudio,
        status: 'active'
      });

      await albumModel.getAlbumForCreation({
        artistId: body.artistId,
        name: body.name
      });

      await albumModel.createAlbum<AlbumInterface>({ ...data });

      return this._res.status(201).end();
    } catch (error) {
      deleteFile(pathUrlAudio);
      this._next(error);
    }
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
      const {
        params: { id }
      } = this._req;

      const result: AlbumInterface = await albumModel.getAlbumForId(id);
      const album = albumDto(result);

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
      const { params, query } = this._req;

      const data = { ...params, ...query };
      const album = await albumModel.getAlbum(data);

      return this._res.json(album).end();
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

class ExistAlbumController {
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
      const { body } = this._req;
      const response = await albumModel.getAlbum({
        artistId: body.artistId,
        name: body.name
      });

      if (response) throw new createError.Forbidden({ detail: 'Ready exist' });

      this._next();
    } catch (error) {
      return this._next();
    }
  }
}

export {
  CreateAlbum,
  DeleteAlbum,
  GetAlbum,
  GetAlbumBy,
  GetAlbums,
  UpdateAlbum,
  ExistAlbumController
};
