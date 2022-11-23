import albumDao from './album.dao';
import { errorCodes, errors } from '@utils/errors.common';
const createError = errors(':: Album Model ::');

export default {
  async getAlbums<T>(page: any, limit: any, filter): Promise<T> {
    try {
      const response: T = await albumDao.getAlls<T>(page, limit, filter);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getAlbum<T>(data: any): Promise<T> {
    try {
      const response: T = await albumDao.get<T>(data);
      return response && response[0];
    } catch (error) {
      throw error;
    }
  },

  async getAlbumForCreation<T>(data: any): Promise<T | boolean> {
    try {
      const response: T[] = await albumDao.get<T | any>({
        artistId: data.artistId,
        status: 'active'
      });

      const existAlbum = response.find(
        (element: any) => element.name === data.name
      );

      if (response.length >= 20 || existAlbum) {
        throw existAlbum
          ? new createError.Forbidden({ detail: 'Album already createred' })
          : new createError.Forbidden({ detail: 'Maximum albums created' });
      }

      return true;
    } catch (error) {
      if (error.errorCode === errorCodes.SERVICE_FORBIDDEN) throw error;
      return true;
    }
  },

  async createAlbum<T>(data: any): Promise<T> {
    try {
      const response: T = await albumDao.create<T>(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateAlbum<T>(data, dataDb): Promise<T> {
    try {
      const response: T = await albumDao.update<T>(data, dataDb);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteAlbum<T>(_id: any): Promise<void> {
    try {
      const response: void = await albumDao.delete<T>(_id);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
