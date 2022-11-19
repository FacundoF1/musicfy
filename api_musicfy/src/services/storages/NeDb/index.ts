import Nedb from 'nedb';
import { DBAccessModel } from './nedb.interface';

export class ConnectionNeDB {
  private nedb: Nedb | any;

  constructor(nameDBAccess: DBAccessModel) {
    this.nedb = new Nedb(`database/${nameDBAccess}.db`);
    this.nedb.loadDatabase();
  }

  public connectionNeDB() {
    return this.nedb;
  }
}
