import * as Joi from 'joi';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';

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

export { validator, bodyCreateValidator, bodyUpdateValidator };
