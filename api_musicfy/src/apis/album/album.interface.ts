interface HandlerInterface {
  handleRequest(): void;
}

interface AlbumInterface {
  _id?: string;
  name: string;
  year: number;
  url: string;
  pathId?: string;
  artistId?: string;
  pathUrlAudio?: string;
  status?: statusInterface;
}

enum statusInterface {
  'active',
  'inactive'
}

export { HandlerInterface, AlbumInterface };
