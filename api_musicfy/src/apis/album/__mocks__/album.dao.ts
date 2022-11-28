import { errors } from '@utils/errors.common';
const createError = errors(':: Album DAO ::');

class ConnectionNeDBDao {
  getAlls = async <T>(page: any, limit: any) => {
    if (page === 0)
      return [
        {
          name: 'sin igual',
          year: '2023',
          url: 'http://www.google.com',
          _id: 'testDb'
        }
      ];
    return Promise.reject(new createError.DataNotFound({ name: 'Album' }));
  };

  getById = async <T>(id: any) => {
    return null;
  };

  get = async <T>(data: any) => {
    if (data?.status === 'active' && data?.artistId === 'test.Forbidden') {
      return [
        {
          name: 'test.Forbidden',
          year: '2023',
          url: 'http://www.google.com',
          pathId: 'e3c01029-f08d-43c8-b96b-354fe998d3d2',
          artistId: 'test.Forbidden',
          pathUrlAudio:
            '/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/src/services/storages/files/albums/acc-123456715/e3c01029-f08d-43c8-b96b-354fe998d3d2.mp3',
          status: 'active',
          _id: 'VPtsd3K4Gbt1RmPb'
        }
      ];
    }
    if (data?._id === 'testDb') {
      return [
        {
          name: 'sin igual',
          year: '2023',
          url: 'http://www.google.com',
          _id: 'testDb'
        }
      ];
    }
    if (data?.artistId === 'testMaxAlbum') return [...Array(20).keys()];

    throw new createError.DataNotFound({ name: 'Album' });
  };

  create = async <T>(data: any) => {
    if (data) return true;
    return Promise.reject(new createError.CreateError({ detail: 'Album' }));
  };

  update = async <T>(dataDb: any, data?: object | any) => {
    if (dataDb?._id === 'testDb')
      return [
        {
          name: 'sin iguals',
          year: 2028,
          url: 'http://www.google.com',
          artistId: 'acc-12345675',
          status: 'active',
          _id: '5edbFYN5Q5kXdZlW'
        }
      ];
    if (dataDb?._id === 'errorTest')
      throw new createError.DeleteError({ detail: 'Album' });

    if (dataDb?._id === 'teError')
      throw new createError.UpdateError({ detail: 'Album' });

    return null;
  };

  delete = async <T>(id: any) => {
    if (id) return true;
    return Promise.reject(new createError.DeleteError({ detail: 'Album' }));
  };
}

const userDao = new ConnectionNeDBDao();

export default userDao;
