import { userDao } from './album.dao';

export default {
  async getAlbums(page: any, limit: any) {
    try {
      const response = await userDao.getAlls(page, limit);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getAlbum(data: any) {
    try {
      const response = await userDao.get(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getAlbumForId(id: any) {
    try {
      const response = await userDao.get(id);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createAlbum(user: any) {
    try {
      const response = await userDao.create(user);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateAlbum(
    id: string | number,
    { email, username }: { email: string | number; username: string | number }
  ) {
    try {
      const response = await userDao.update(id, { email, username });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteAlbum(id: any) {
    try {
      const response = await userDao.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
