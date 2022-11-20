// @Modules
import { required, validateAttr } from '@utils/index';
import { AlbumInterface } from './album.interface';

const createAlbumDto = (resource: AlbumInterface): AlbumInterface => {
  const response: AlbumInterface | any = validateAttr('name', resource.name)
    .validateAttr('year', resource.year)
    .validateAttr('url', resource.url)
    .toObject();

  required(
    {
      name: response.name,
      year: response.year,
      url: response.url
    },
    {},
    'createAlbumReqDto',
    'Album'
  );

  return response;
};

export { createAlbumDto };
