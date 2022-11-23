import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const bodyCreateValidator = Joi.object({
  artistId: Joi.string().min(5).required(),
  name: Joi.string().min(3).required(),
  year: Joi.number().min(4).required(),
  url: Joi.string().min(3).required()
});

const bodyUpdateValidator = Joi.object({
  _id: Joi.string().min(5).required(),
  name: Joi.string().min(3),
  year: Joi.number().min(4),
  url: Joi.string().min(3)
});

const paramIdValidator = Joi.object({
  _id: Joi.string().min(4).required()
});

export {
  validator,
  bodyCreateValidator,
  bodyUpdateValidator,
  paramIdValidator
};
