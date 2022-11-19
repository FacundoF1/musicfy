import { ConnectionNeDB } from '@services/storages/NeDb/index';
import { DBAccessModel } from '@services/storages/NeDb/nedb.interface';
import { errors } from '@errors';
const createError = errors(':: NeDB DAO ::');

class ConnectionNeDBDao {
  private collection: any;

  constructor() {
    this.collection = new ConnectionNeDB(
      DBAccessModel['user']
    ).connectionNeDB();
  }

  getAlls = async (page: any, limit: any) => {
    return new Promise((resolve, reject) =>
      this.collection
        .find({})
        .skip(page * limit)
        .limit(limit)
        .exec((err: any, docs: any) => {
          if (err || docs.length === 0) {
            const error = new createError.DataNotFound({});
            return reject(err || error);
          }
          return resolve(docs);
        })
    );
  };

  getById = async (id: any): Promise<[]> => {
    return new Promise((resolve, reject) =>
      this.collection.findOne({ _id: id }, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.DataNotFound({});
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };

  get = async (data: any): Promise<[]> => {
    return new Promise((resolve, reject) =>
      this.collection.find(data, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.DataNotFound({});
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };

  create = async (data: any) => {
    return new Promise((resolve, reject) =>
      this.collection.insert(data, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.CreateError({});
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };

  update = async (id: any, data?: object | any) => {
    const { email, username } = data;
    const update = { $set: { email, username } };

    return new Promise((resolve, reject) =>
      this.collection.update({ _id: id }, update, {}, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.UpdateError({});
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };

  delete = async (id: any) => {
    return new Promise((resolve, reject) =>
      this.collection.remove({ _id: id }, (err: any, docs: any) => {
        if (err || docs.length === 0) {
          const error = new createError.DeleteError({});
          return reject(err || error);
        }
        return resolve(docs);
      })
    );
  };
}

const userDao = new ConnectionNeDBDao();

export { userDao };
