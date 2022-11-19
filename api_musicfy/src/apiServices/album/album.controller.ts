import userModel from './album.model';
import userDto from './album.dto';
import { Request, Response } from 'express';
import { systemDecorator } from '../../decorators';
import { Handler } from './album.interface';
const { countInstances } = systemDecorator;

import { errors } from '@errors';
const createError = errors(':: UserController ::');

@countInstances
class CreateUser implements Handler {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    const {
      body: { username, password, email }
    } = this._req;

    if (!username || !password || !email)
      return this._res.sendStatus(400).end();

    // lack validate type de carateres body

    const users = await userModel.createUser({
      username,
      password,
      email
    });

    return this._res.send(userDto.single(users)).end();
  }
}

@countInstances
class GetUsers implements Handler {
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
      // lack validate type de carateres query
      const {
        query: { page, limit }
      } = this._req;

      const res_page = parseInt((page || 0).toString(), 10);
      const res_limit = parseInt((limit || 10).toString(), 10);

      const users = await userModel.getUsers(res_page, res_limit);

      return this._res.json(userDto.multiple(users));
    } catch (error) {
      this._next(error);
    }
  }
}

@countInstances
class GetUser {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    // lack validate type de carateres query
    try {
      const {
        params: { id },
        body
      } = this._req;
      const user = await userModel.getUserForId(id);
      if (!user) throw new createError.DataNotFound({ name: 'User' });

      const response = userDto.single(user);
      return this._res.send(response).end();
    } catch (error) {
      this._next(error);
    } finally {
      // METRICS
    }
  }
}

@countInstances
class GetUserBy {
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
      // lack validate type de carateres query
      const { params } = this._req;
      const user = await userModel.getUser({ ...params });
      if (!user) return this._res.sendStatus(404);

      return this._res.json(user).end();
    } catch (error) {
      this._next(error);
    } finally {
      // METRICS
    }
  }
}

@countInstances
class DeleteUser implements Handler {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    const {
      params: { id }
    } = this._req;

    const result = await userModel.deleteUser(id);
    const status = !result ? 404 : 204;

    return this._res.sendStatus(status).end();
  }
}

@countInstances
class UpdateUser {
  private _req: Request;
  private _res: Response;
  private _next: any;

  constructor(req: Request, res: Response, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  async handleRequest() {
    const {
      body: { username, email },
      params: { id }
    } = this._req;

    if (!username || !email) return this._res.sendStatus(400).end();

    const user = await userModel.getUser(id);
    if (!user) return this._res.sendStatus(404).end();

    await userModel.updateUser(id, {
      username: username,
      email: email
    });

    return this._res.sendStatus(204).end();
  }
}

export { CreateUser, DeleteUser, GetUser, GetUserBy, GetUsers, UpdateUser };
