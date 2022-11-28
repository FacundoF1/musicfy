import express, { Request, Response } from 'express';
const router = express.Router();

import {
  UpdateAlbum,
  GetAlbums,
  GetAlbumBy,
  CreateAlbum,
  DeleteAlbum
} from './album.controller';

import {
  validator,
  bodyCreateValidator,
  bodyUpdateValidator,
  paramIdValidator
} from './album.validator';

const deleteAlbumController = async (req: Request, res: Response, next: any) =>
  await new DeleteAlbum(req, res, next).handleRequest();
const createAlbumController = async (req: Request, res: Response, next: any) =>
  await new CreateAlbum(req, res, next).handleRequest();
const updateAlbumController = async (req: Request, res: Response, next: any) =>
  await new UpdateAlbum(req, res, next).handleRequest();
const getAlbumsController = async (req: Request, res: Response, next: any) =>
  await new GetAlbums(req, res, next).handleRequest();
const getAlbumByController = async (req: Request, res: Response, next: any) =>
  await new GetAlbumBy(req, res, next).handleRequest();

router.get('/', getAlbumsController);
router.post('/', validator.body(bodyCreateValidator), createAlbumController);
router.put('/', validator.body(bodyUpdateValidator), updateAlbumController);

router.get('/:_id?', validator.params(paramIdValidator), getAlbumByController);
router.delete(
  '/:_id',
  validator.params(paramIdValidator),
  deleteAlbumController
);

export default router;
