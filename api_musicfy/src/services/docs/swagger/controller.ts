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
  apis: ['../../../apis/album/album.routes']
};

const specs = swaggerJsdoc(options);

export default (app: any) => {
  // serve swagger
  app.get('/api-docs.json', function (req: Request, res: Response) {
    // line 41
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  app.get('/api-docs/*', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui.css', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-init.js', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-bundle.js', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-standalone-preset.js', ...swaggerUi.serve);
  app.get('/api-docs/favicon-32x32.png', ...swaggerUi.serve);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
