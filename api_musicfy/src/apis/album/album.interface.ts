interface HandlerInterface {
  handleRequest(): void;
}

interface AlbumInterface {
  _id?: string;
  name: string;
  year: number;
  url: string;
  artistId?: string;
  status?: statusInterface;
}

enum statusInterface {
  'active',
  'inactive'
}

export { HandlerInterface, AlbumInterface };
