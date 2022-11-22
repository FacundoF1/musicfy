class ConnectionNeDBDao {
  getAlls = async <T>(page: any, limit: any) => {
    return null;
  };

  getById = async <T>(id: any) => {
    return null;
  };

  get = async <T>(data: any) => {
    if (data.status === 'active' && data.artistId === 'test.Forbidden') {
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
    if (data._id === 'testDb') {
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
    return data.id ? true : false;
  };

  update = async <T>(id: any, data?: object | any) => {
    return null;
  };

  delete = async <T>(id: any) => {
    return null;
  };
}

const userDao = new ConnectionNeDBDao();

export default userDao;
