import { errors } from '@utils/errors.common';
const createError = errors(':: Album DAO ::');
class ConnectionNeDBDao {
  getAlls = async <T>(page: any, limit: any) => {
    return page === 0
      ? [
          {
            name: 'sin igual',
            year: '2023',
            url: 'http://www.google.com',
            _id: 'testDb'
          }
        ]
      : null;
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
    return null;
  };

  create = async <T>(data: any) => {
    return data?._id ? true : null;
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

    return null;
  };

  delete = async <T>(id: any) => {
    return null;
  };
}

const userDao = new ConnectionNeDBDao();

export default userDao;
