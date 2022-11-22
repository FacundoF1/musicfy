// @Vendors
import express, { Request, Response } from 'express';
const router = express.Router();

// @Modules
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
  bodyUpdateValidator
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
router.get('/:_id?', getAlbumByController);
router.post('/', validator.body(bodyCreateValidator), createAlbumController);
router.put('/', validator.body(bodyUpdateValidator), updateAlbumController);
router.delete('/:_id', deleteAlbumController);

export default router;
