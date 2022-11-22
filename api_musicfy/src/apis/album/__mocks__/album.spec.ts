import albumModel from './album.model';

describe('Album', () => {
  test('Model', async () => {
    expect(await albumModel.getAlbums(0, 1)).toBe(null);

    expect(await albumModel.getAlbum('data')).toBe(null);

    expect(await albumModel.createAlbum('data')).toBe(null);

    expect(await albumModel.updateAlbum('id', {})).toBe(null);

    expect(await albumModel.deleteAlbum('id')).toBe(null);

    expect(await albumModel.getAlbumForCreation('data')).toBe(null);
  });
});
