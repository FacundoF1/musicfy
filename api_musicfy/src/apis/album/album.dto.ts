// @Modules
import { required, validateAttr } from '@utils/index';
import { AlbumInterface } from './album.interface';

const albumDto = (
  resource: AlbumInterface | any,
  isRequired = true
): AlbumInterface => {
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
    .validateAttr('_id', resource._id)
    .toObject();

  isRequired &&
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

const albumsDto = (resources): [] =>
  resources.map(({ name, year, url, _id }: AlbumInterface) =>
    albumDto({ name, year, url, _id })
  );

export { albumDto, albumsDto };
