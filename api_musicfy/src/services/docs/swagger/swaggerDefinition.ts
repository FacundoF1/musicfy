export default {
  openapi: '3.0.0',
  info: {
    title: 'Musicfy',
    version: '1.1.0',
    description: 'Documentation Api Restful',
    contact: {
      name: 'Facundo Ferrari',
      email: 'facundo.ferrarif@gmail.com',
      url: 'https://github.com/FacundoF1/'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  tags: [
    {
      name: 'Album'
    }
  ],
  components: {
    schemas: {
      Album: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: 'FIKnnkPWaKzntD8G',
            description: 'Album id.'
          },
          name: {
            type: 'string',
            example: 'SuperTest',
            description: 'Album name.'
          },
          year: {
            type: 'number',
            example: '2022',
            description: 'Album year'
          },
          url: {
            type: 'string',
            example: 'http://uri.com',
            description: 'Album url image.'
          },
          artistId: {
            type: 'string',
            example: 'acc-456660',
            description: 'Id artist the album.'
          },
          status: {
            type: 'enum',
            example: 'active',
            items: {
              $ref: '#/components/schemas/StatusModel'
            }
          }
        }
      },
      PostAlbum: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'SuperTest',
            description: 'Album name.',
            required: true
          },
          year: {
            type: 'number',
            example: '2022',
            description: 'Album year',
            required: true
          },
          url: {
            type: 'string',
            example: 'http://uri.com',
            description: 'Album url image.',
            required: true
          },
          artistId: {
            type: 'string',
            example: 'acc-456660',
            description: 'Id artist the album.',
            required: true
          }
        }
      },
      PutAlbum: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'SuperTest',
            description: 'Album name.'
          },
          year: {
            type: 'number',
            example: '2022',
            description: 'Album year'
          },
          url: {
            type: 'string',
            example: 'http://uri.com',
            description: 'Album url image.'
          },
          _id: {
            type: 'string',
            example: 'asxx2E456660',
            description: 'Id artist the album.'
          }
        }
      },
      StatusModel: {
        type: 'enum',
        value: ['active', 'inactive']
      },
      ErrorModel: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'string' },
          errorCode: { type: 'string' },
          timestamp: { type: 'string' },
          extraData: { type: 'object' },
          stackTrace: { type: 'array' }
        }
      }
    }
  },
  paths: {
    '/albums': {
      get: {
        tags: ['Album'],
        summary:
          'Buscar todo los albunes. Por defecto se busca con status=active',
        description:
          'Servicio para devolve todo los albunes. Se puede pasar query params para filtrar la busqueda.',
        produces: ['application/json'],
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: false,
            explode: true,
            schema: {
              type: 'string',
              default: 'active',
              $ref: '#/components/schemas/StatusModel'
            }
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page values that need to be considered for filter',
            required: false,
            explode: true,
            schema: {
              type: 'number',
              default: 0
            }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Limit values that need to be considered for filter',
            required: false,
            explode: true,
            schema: {
              type: 'number',
              default: 3
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Album' }
              }
            }
          },
          '404': {
            description: 'Data Not Found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorModel' }
              }
            }
          },
          '500': { description: 'Error en el servidor' }
        }
      },
      post: {
        tags: ['Album'],
        summary: 'Crear un album.',
        description:
          'Servicio para crear un album. Requisitos: solo pueden existir hasta un máximo de 20 álbumes.',
        produces: ['application/json'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostAlbum'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Created'
          },
          '404': {
            description: 'Data Not Found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorModel' }
              }
            }
          },
          '403': {
            description:
              'Forbidden: [Album already createred or Maximum albums created]',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorModel' }
              }
            }
          },
          '500': { description: 'Error en el servidor' }
        }
      },
      put: {
        tags: ['Album'],
        summary: 'Actualizar un album.',
        description: 'Servicio para actualizar un album.',
        produces: ['application/json'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PutAlbum'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Created'
          },
          '404': {
            description: 'Data Not Found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorModel' }
              }
            }
          },
          '500': { description: 'Error en el servidor' }
        }
      }
    },
    '/albums/{_id}': {
      delete: {
        tags: ['Album'],
        summary: 'Eliminar un album.',
        description: 'Servicio para eliminar un album.',
        produces: ['application/json'],
        parameters: [
          {
            name: '_id',
            in: 'path',
            description: 'Delete one album by _id. Only logic delete.',
            required: true,
            explode: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '204': {
            description: 'No Content'
          },
          '500': { description: 'Error en el servidor' }
        }
      },
      get: {
        tags: ['Album'],
        summary: 'Buscar un albun.',
        description: 'Servicio para devolver un albun filtrado por _id.',
        produces: ['application/json'],
        parameters: [
          {
            name: '_id',
            in: 'path',
            description: 'Get one album by _id',
            required: false,
            explode: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Album' }
              }
            }
          },
          '404': {
            description: 'Data Not Found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorModel' }
              }
            }
          },
          '500': { description: 'Error en el servidor' }
        }
      }
    }
  }
};
