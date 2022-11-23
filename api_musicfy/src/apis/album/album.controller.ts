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
    try {
      const { body } = this._req;
      const status = 'active';
      const data = albumDto({
        ...body,
        status
      });

      await albumModel.getAlbumForCreation({
        artistId: body.artistId,
        name: body.name,
        status
      });

      await albumModel.createAlbum<AlbumInterface>(data);

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
      const { query } = this._req;
      const { page, limit } = query;

      const res_page = Number(page) || 0;
      const res_limit = Number(limit) || 20;

      const filterAlbum = albumDto(query, false);
      const filters = Object.keys(filterAlbum).length
        ? filterAlbum
        : { status: 'active' };

      const albums = await albumModel.getAlbums(res_page, res_limit, filters);
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

      const data = albumDto({ status: 'active', ...params, ...query }, false);
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
        params: { _id }
      } = this._req;

      await albumModel.updateAlbum({ _id }, { status: 'inactive' });

      return this._res.status(204).end();
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

      return this._res.status(204).end();
    } catch (error) {
      this._next(error);
    }
  }
}

export { CreateAlbum, DeleteAlbum, GetAlbumBy, GetAlbums, UpdateAlbum };
