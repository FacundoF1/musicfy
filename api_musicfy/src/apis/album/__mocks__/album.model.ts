export default {
  async getAlbums<T>(page: any, limit: any) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  },

  async getAlbum<T>(data: any) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  },

  async getAlbumForId<T>(id: string) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  },

  async createAlbum<T>(data: any) {
    try {
      return false;
    } catch (error) {
      throw error;
    }
  },

  async updateAlbum<T>(
    id: string | number,
    { email, username }: { email: string | number; username: string | number }
  ) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  },

  async deleteAlbum<T>(id: any) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  },

  async getAlbumForCreation<T>(data: any) {
    try {
      return null;
    } catch (error) {
      throw error;
    }
  }
};
