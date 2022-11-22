// @Modules
import { required, validateAttr } from '@utils/index';
import { AlbumInterface } from './album.interface';

const albumDto = (resource: AlbumInterface): AlbumInterface => {
  const response: AlbumInterface | any = validateAttr('name', resource.name)
    .validateAttr('year', resource.year)
    .validateAttr('url', resource.url)
    .validateAttr(
      'pathId',
      resource?.pathId && resource?.pathId.replace('.mp3', '')
    )
    .validateAttr('artistId', resource.artistId)
    .validateAttr('pathUrlAudio', resource.pathUrlAudio)
    .validateAttr('status', resource.status)
    .toObject();

  required(
    {
      name: response.name,
      year: response.year,
      url: response.url,
      pathId: response.pathId,
      artistId: response.artistId,
      pathUrlAudio: resource.pathUrlAudio,
      status: resource.status
    },
    {},
    'createAlbumReqDto',
    'Album'
  );

  return response;
};

export { albumDto };
