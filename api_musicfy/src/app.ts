import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from '@middlewares/index';

import endpoints from '@routes/endpoints';
import swaggerDoc from '@services/docs/swagger/controller';
var bodyParser = require('body-parser');

const app = express();
app.use(logger('dev', {}));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

endpoints(app);
swaggerDoc(app);

// Seguridad
app.use(helmet());
app.use(compression());

app.use(errorHandler);

export { app };
