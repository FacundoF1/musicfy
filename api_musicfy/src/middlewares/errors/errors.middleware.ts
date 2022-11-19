// @Vendors
import { Request, Response, NextFunction } from 'express';

// @Modules
import { errorResponseDto } from './errors.dto';

const errorHandler = (
  error: any,
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  const statusCode = error.status || error.statusCode || 500;
  return res.status(statusCode).send(errorResponseDto(error));
};

export { errorHandler };
