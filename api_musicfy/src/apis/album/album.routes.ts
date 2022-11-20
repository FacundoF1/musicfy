// @Vendors
import express, { Request, Response } from 'express';
const router = express.Router();

// @Modules
import {
  UpdateAlbum,
  GetAlbum,
  GetAlbums,
  GetAlbumBy,
  CreateAlbum,
  DeleteAlbum
} from './album.controller';

const deleteAlbumController = async (req: Request, res: Response, next: any) =>
  await new DeleteAlbum(req, res, next).handleRequest();
const createAlbumController = async (req: Request, res: Response, next: any) =>
  await new CreateAlbum(req, res, next).handleRequest();
const updateAlbumController = async (req: Request, res: Response, next: any) =>
  await new UpdateAlbum(req, res, next).handleRequest();
const getAlbumController = async (req: Request, res: Response, next: any) =>
  await new GetAlbum(req, res, next).handleRequest();
const getAlbumsController = async (req: Request, res: Response, next: any) =>
  await new GetAlbums(req, res, next).handleRequest();
const getAlbumByController = async (req: Request, res: Response, next: any) =>
  await new GetAlbumBy(req, res, next).handleRequest();

/**
 * @swagger
 * paths:
 *  /stats:
 *    get:
 *      tags:
 *        - Mutants
 *      summary: Busqueda en base de datos.
 *      description: Exponer un servicio extra que devuelva un Json con las estadísticas de las verificaciones de ADN.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: Ok
 *             schema:
 *              $ref: '#/components/schemas/Stats'
 *          500:
 *             description: Error en el servidor
 */
router.get('/', getAlbumsController);

/**
 * @swagger
 * paths:
 *  /stats:
 *    get:
 *      tags:
 *        - Mutants
 *      summary: Busqueda en base de datos.
 *      description: Exponer un servicio extra que devuelva un Json con las estadísticas de las verificaciones de ADN.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: Ok
 *             schema:
 *              $ref: '#/components/schemas/Stats'
 *          500:
 *             description: Error en el servidor
 */
router.get('/:id', getAlbumController);

/**
 * @swagger
 * paths:
 *  /auth:
 *    post:
 *      parameters:
 *        - in: body
 *          name: isMutant
 *          required: true
 *          schema:
 *              $ref: '#/auth/login'
 *      tags:
 *        - Mutants
 *      summary: Validación y carga.
 *      description: Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta '200||403' - 412 body del post con error.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: OK
 *          403:
 *             description: Credentials validation.
 *          500:
 *             description: Error en el servidor
 */
router.post('/', createAlbumController);

/**
 * @swagger
 * paths:
 *  /auth:
 *    post:
 *      parameters:
 *        - in: body
 *          name: isMutant
 *          required: true
 *          schema:
 *              $ref: '#/auth/login'
 *      tags:
 *        - Mutants
 *      summary: Validación y carga.
 *      description: Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta '200||403' - 412 body del post con error.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: OK
 *          403:
 *             description: Credentials validation.
 *          500:
 *             description: Error en el servidor
 */
router.get('/:name', getAlbumByController);

/**
 * @swagger
 * paths:
 *  /auth:
 *    post:
 *      parameters:
 *        - in: body
 *          name: isMutant
 *          required: true
 *          schema:
 *              $ref: '#/auth/login'
 *      tags:
 *        - Mutants
 *      summary: Validación y carga.
 *      description: Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta '200||403' - 412 body del post con error.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: OK
 *          403:
 *             description: Credentials validation.
 *          500:
 *             description: Error en el servidor
 */
router.patch('/:id', updateAlbumController);

/**
 * @swagger
 * paths:
 *  /auth:
 *    post:
 *      parameters:
 *        - in: body
 *          name: isMutant
 *          required: true
 *          schema:
 *              $ref: '#/auth/login'
 *      tags:
 *        - Mutants
 *      summary: Validación y carga.
 *      description: Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta '200||403' - 412 body del post con error.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: OK
 *          403:
 *             description: Credentials validation.
 *          500:
 *             description: Error en el servidor
 */
router.delete('/:id', deleteAlbumController);

export default router;
