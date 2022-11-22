import ApiError from './errors';

const errorCodes = {
  ERROR_LIST: 'ERROR_LIST',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  INVALID_DATA: 'INVALID_DATA',
  DATA_REQUIRED: 'DATA_REQUIRED',
  SERVICE_UNAUTHORIZED: 'SERVICE_UNAUTHORIZED',
  SERVICE_FORBIDDEN: 'SERVICE_FORBIDDEN',
  SERVICE_ERROR: 'SERVICE_ERROR',
  MONGO_ERROR: 'MONGO_ERROR',
  CREATE_ERROR: 'CREATE_ERROR',
  UPDATE_ERROR: 'UPDATE_ERROR',
  DELETE_ERROR: 'UPDATE_ERROR'
};

const print = (field, prefix = ' ', postfix = '', def = '') => {
  const data = {
    prefix: prefix,
    postfix: postfix,
    default: def
  };
  return field ? `${data.prefix}${field}${data.postfix}` : data.default;
};

const errors = (module) => {
  const createError = ApiError.Helper(module);

  return {
    ErrorList: createError({
      message: ({ list, listMessage }) => {
        if (listMessage)
          return typeof listMessage === 'function'
            ? listMessage(list)
            : listMessage;

        return list.length ? list[0].message : 'Error List';
      },

      statusCodeHttp: ({ listHttp, list }, error = { errors: [] }) => {
        const {
          errors: [elm]
        } = error;
        if (listHttp)
          return typeof listHttp === 'function' ? listHttp(list) : listHttp;

        return elm ? elm['status'] : 500;
      },

      code: ({ listCode, list }, error = { errors: [] }) => {
        const {
          errors: [elm]
        } = error;
        if (listCode)
          return typeof listCode === 'function' ? listCode(list) : listCode;

        return elm ? elm['errorCode'] : errorCodes.ERROR_LIST;
      }
    }),

    DataNotFound: createError({
      code: errorCodes.DATA_NOT_FOUND,
      message: ({ name }) => `${print(name, '', ' ')}Not Found`,
      statusCodeHttp: 404
    }),

    NotImplemented: createError({
      code: errorCodes.NOT_IMPLEMENTED,
      message: ({ detail }) => `Not Implemented${print(detail)}`,
      statusCodeHttp: 501
    }),

    InvalidData: createError({
      code: errorCodes.INVALID_DATA,
      message: ({ details }) => `Invalid data${print(details)}`,
      statusCodeHttp: 400
    }),

    DataRequired: createError({
      code: errorCodes.DATA_REQUIRED,
      message: ({ field, file, fn }) =>
        `Field ${print(field, '', undefined, '<<unknown>>')} is required${print(
          file
        )}${print(fn, undefined, '()')}`,
      statusCodeHttp: 400
    }),

    Unauthorized: createError({
      code: errorCodes.SERVICE_UNAUTHORIZED,
      message: ({ detail }) => `Unauthorized${print(detail)}`,
      statusCodeHttp: 401
    }),

    Forbidden: createError({
      code: errorCodes.SERVICE_FORBIDDEN,
      message: ({ detail }) => `Forbidden${print(detail)}`,
      statusCodeHttp: 403
    }),

    ServiceError: createError({
      code: errorCodes.SERVICE_ERROR,
      message: ({ detail }) => `Service Error${print(detail)}`,
      statusCodeHttp: 500
    }),

    MongoError: createError({
      code: errorCodes.MONGO_ERROR,
      message: ({ detail }) => `Mongo Error${print(detail)}`,
      statusCodeHttp: 500
    }),

    // CRUD Errors
    CreateError: createError({
      code: errorCodes.CREATE_ERROR,
      message: ({ detail }) => `Cannot create${print(detail)}}`,
      statusCodeHttp: 500
    }),

    UpdateError: createError({
      code: errorCodes.UPDATE_ERROR,
      message: ({ detail }) => `Cannot update${print(detail)}}`,
      statusCodeHttp: 500
    }),

    DeleteError: createError({
      code: errorCodes.DELETE_ERROR,
      message: ({ detail }) => `Cannot delete${print(detail)}}`,
      statusCodeHttp: 500
    })
  };
};

export { errors, errorCodes };
