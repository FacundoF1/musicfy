import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const bodyCreateAlbumValidator = [
  body('artistId').isString().isLength({ min: 5 }),
  body('name').isString().isLength({ min: 5 }),
  body('year').isString().isLength({ min: 4 }),
  body('url').isString().isLength({ min: 5 })
];

const createAlbumValidators = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { bodyCreateAlbumValidator, createAlbumValidators };
