import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from '@middlewares/index';
import cors from 'cors';

import endpoints from '@routes/endpoints';
import swaggerDoc from '@services/docs/swagger/controller';

const app = express();
app.use(logger('dev', {}));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Pass to next layer of middleware
  next();
});

endpoints(app);
swaggerDoc(app);

// Seguridad
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(errorHandler);

export { app };
