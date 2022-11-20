import { createWriteStream } from 'fs';
import { errors } from '@errors';
const createError = errors(':: Middleware Stream ::');

const writeFileStream = async (data, pathUrlFs) => {
  const writeStream = createWriteStream(pathUrlFs);

  writeStream.write(data);

  writeStream.end();

  writeStream.on('error', (error) => {
    throw new createError.ServiceError({ detail: 'Save file' });
  });

  const response = await writeStream.on('finish', async () => {
    console.log('Finished writing');
    return true;
  });

  return response;
};

export { writeFileStream };
