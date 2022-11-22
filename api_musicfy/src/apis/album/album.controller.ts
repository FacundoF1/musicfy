// @Vendors

// @Modules
import albumModel from './album.model';
import { Request, Response } from 'express';
import { systemDecorator } from '../../decorators';
import { albumDto, albumsDto } from './album.dto';
const { countInstances } = systemDecorator;

import { errors } from '@utils/errors.common';
const createError = errors(':: AlbumController ::');
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
      const res_limit = parseInt((limit || 3).toString(), 10);

      const albums = await albumModel.getAlbums(res_page, res_limit);
      const response = albumsDto(albums);

      return this._res.send(response);
    } catch (error) {
      this._next(error);
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
      const { params, query } = this._req;

      const data = albumDto({ ...params, ...query }, false);
      const result = await albumModel.getAlbum<AlbumInterface>(data);

      if (!result) throw new createError.DataNotFound({ name: 'Album' });

      const album = albumDto(
        {
          _id: result._id,
          name: result.name,
          url: result.url,
          year: result.year
        },
        false
      );

      return this._res.send(album).end();
    } catch (error) {
      this._next(error);
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
      const { body } = this._req;

      const newData = albumDto(
        {
          _id: body._id,
          name: body.name,
          year: body.year,
          url: body.url
        },
        false
      );

      await albumModel.updateAlbum({ _id: body._id }, newData);

      return this._res.sendStatus(204).end();
    } catch (error) {
      this._next(error);
    }
  }
}

export { CreateAlbum, DeleteAlbum, GetAlbumBy, GetAlbums, UpdateAlbum };
