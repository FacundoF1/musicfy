// @Vendors
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Extension } from './stream.dto';

let pathFolderStorage = '';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {
      body: { artistId },
      baseUrl
    } = req;

    pathFolderStorage = `../../services/storages/files${baseUrl}`;

    const pathFile = path.join(__dirname, pathFolderStorage, `${artistId}/`);

    if (!existsSync(pathFile)) mkdirSync(pathFile, { recursive: true });

    cb(null, pathFile);
  },
  filename: (req, file, cb) => {
    const pathId = uuidv4();
    const ext = new Extension().getExtension(file.mimetype);
    cb(null, `${pathId}${ext}`);
  }
});

const upload = multer({
  dest: path.join(__dirname, pathFolderStorage),
  storage: storage,
  limits: { fileSize: 1000000000 }
});

export default upload;
