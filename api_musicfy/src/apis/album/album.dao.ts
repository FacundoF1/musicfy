import { ConnectionNeDB } from '@services/storages/NeDb/index';
import { DBAccessModel } from '@services/storages/NeDb/nedb.interface';
import { errors } from '@utils/errors.common';
const createError = errors(':: Album DAO ::');

class ConnectionNeDBDao {
  private collection: any;

  constructor() {
    this.collection = new ConnectionNeDB(
      DBAccessModel['album']
    ).connectionNeDB();
  }

  getAlls = async <T>(page: any, limit: any, filter): Promise<T> => {
    return new Promise((resolve, reject) =>
      this.collection
        .find(filter)
        .skip(page * limit)
        .limit(limit)
        .exec((err: any, docs: any) => {
          if (err || !docs || docs.length === 0) {
            const error = new createError.DataNotFound({ name: 'Album' });
            return reject(err || error);
          }
          return resolve(docs);
        })
    );
  };

  getById = async <T>(id: any): Promise<T> => {
    return new Promise((resolve, reject) =>
      this.collection.findOne({ _id: id }, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.DataNotFound({});
          return reject(err || error);
        }
        return resolve(docs[0]);
      })
    );
  };

  get = async <T>(data: any): Promise<T> => {
    return new Promise((resolve, reject) =>
      this.collection.find(data, (err: any, docs: any) => {
        if (err || !docs || docs.length === 0) {
          const error = new createError.DataNotFound({ name: 'Album' });
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };

  create = async <T>(data: any): Promise<T> => {
    return new Promise((resolve, reject) =>
      this.collection.insert(data, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.CreateError({ detail: 'Album' });
          return reject(err || error);
        }
        return resolve(docs[0]);
      })
    );
  };

  update = async <T>(data, dataDb): Promise<T> => {
    return new Promise((resolve, reject) =>
      this.collection.update(
        data,
        { $set: dataDb },
        {},
        (err: any, docs: any) => {
          if (err || docs || docs.length === 0) {
            const error = new createError.UpdateError({ detail: 'Album' });
            return reject(err || error);
          }
          return resolve(docs[0]);
        }
      )
    );
  };

  delete = async <T>(_id: any): Promise<void> => {
    return new Promise((resolve, reject) =>
      this.collection.remove({ _id }, (err: any, docs: any) => {
        if (err || !docs || docs.length === 0) {
          const error = new createError.DeleteError({ detail: 'Album' });
          return reject(err || error);
        }
        return resolve();
      })
    );
  };
}

const albumDao = new ConnectionNeDBDao();

export default albumDao;
