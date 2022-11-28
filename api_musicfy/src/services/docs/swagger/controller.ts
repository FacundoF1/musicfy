import { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import configSwaggerJsdoc from './swaggerDefinition';

const options = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null
  },
  swaggerDefinition: configSwaggerJsdoc,
  apis: ['@apis/album/album.routes']
};

const specs = swaggerJsdoc(options);

export default (app: any) => {
  // serve swagger
  app.get('/api-docs/*', ...swaggerUi.serve);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
