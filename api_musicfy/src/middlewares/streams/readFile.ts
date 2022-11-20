import { createReadStream, stat } from 'fs';
import { promisify } from 'util';
import { errors } from '@errors';
const createError = errors(':: Middleware Stream ::');
const fileInfo = promisify(stat);

const readFileStream = async (
  pathUrlFs,
  range,
  type = 'video/mp4'
): Promise<{ headers; fnReadStream }> => {
  return new Promise(async (resolve, reject) => {
    const { size } = await fileInfo(pathUrlFs);

    if (range) {
      let [start, end] = range.replace(/bytes=/, '').split('-');
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size - 1;
      const readStream = createReadStream(pathUrlFs, { start, end });

      resolve({
        headers: {
          'Content-Type': type,
          'Content-Length': end - start + 1,
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${size}`
        },
        fnReadStream: readStream
      });
    }

    resolve({
      headers: {
        'Content-Type': type,
        'Content-Length': size
      },
      fnReadStream: createReadStream(pathUrlFs)
    });
  });
};

export { readFileStream };
