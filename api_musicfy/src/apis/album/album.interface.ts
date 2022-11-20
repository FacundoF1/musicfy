interface HandlerInterface {
  handleRequest(): void;
}

interface AlbumInterface {
  _id?: string;
  name: string;
  year: string;
  url: string;
  pathUrlFs: string;
}

export { HandlerInterface, AlbumInterface };
