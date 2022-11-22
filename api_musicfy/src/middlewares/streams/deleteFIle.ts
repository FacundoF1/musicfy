import { errors } from '@utils/errors.common';
const createError = errors(':: Middlewares DeleteFile ::');

import { unlink } from 'fs';

const deleteFile = (path) => {
  return new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) reject(new createError.ServiceError({ detail: 'Delete file' }));
      resolve(true);
    });
  });
};

export { deleteFile };
