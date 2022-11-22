import { errors } from '@utils/errors.common';
const createError = errors(':: Middleware StreamDto ::');

class Extension {
  mimeType = {
    'audio/mp4': '.mp4a',
    'audio/wave': '.wave',
    'audio/x-wav': '.wav',
    'audio/x-pn-wav': '.x-pn-wav',
    'audio/mpeg': '.mp3',
    'audio/flac': '.flac',
    'audio/MPEG-21': '.m21',
    'audio/wma': '.wma',
    'audio/ogg': '.oga'
  };

  getExtension(_mimeType) {
    const type = this.mimeType[_mimeType];
    if (!type)
      throw new createError.InvalidData({ details: `Extension ${_mimeType}` });
    return this.mimeType[_mimeType];
  }
}

export { Extension };
