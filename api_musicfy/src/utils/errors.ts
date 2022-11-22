const enviroment = process.env.SCOPE;

interface ApiErrorInterface {
  cause?: string;
  isApiError?: boolean;
  stack?;
  stackTrace?;
  status?: number;
  errorCode?: string;
  timestamp?: string;
  extraData?: object;
  statusCodeHttp?: string | object | [];
}

class ApiError extends Error {
  cause: string;
  isApiError: boolean = true;
  stack;
  stackTrace;
  status: number;
  errorCode: string;
  timestamp: string;
  extraData: object;
  statusCodeHttp: string | object | [] | any;
  data: object;
  props: ApiErrorInterface;

  constructor(msg, cause) {
    super(msg);
    this.cause = cause;
    this.isApiError = true;
  }

  getStack(microService = '') {
    const stack =
      typeof this.stack === 'string' ? this.stack.split('\n') : [...this.stack];

    if (this.cause) {
      const causeStack = this.getStackMessage(this.cause);

      if (causeStack && causeStack.length) {
        causeStack[0] = `Caused by ${microService.toUpperCase()} ${
          causeStack[0]
        }`;
      }

      stack.push(...causeStack);
    }

    return stack;
  }

  getStackMessage = (error) => {
    if (error.getStack) {
      return error.getStack();
    }

    if (error.stack) {
      if (typeof error.stack === 'string') {
        return error.stack.split('\n');
      }

      return Object.keys(error.stack).length > 0
        ? [...error.stack]
        : [error.stack];
    }

    return [error.message];
  };

  printStack = (error) => this.getStack(error).join('\n');

  static Helper =
    (module) =>
    ({ message, statusCodeHttp, code }) => {
      const getProps = ({ cause = ' ', ...tmpProps } = {}) => {
        const props = { module, ...tmpProps };
        const isFunction = typeof message === 'function';
        props['message'] = isFunction ? message(props) : message;

        return [props, props['message'], cause];
      };

      /**
       *
       */
      class ApiErrorImpl extends ApiError {
        constructor(data) {
          const [props, ...args] = getProps(data);
          const [message, cause] = args;
          /* eslint-disable line*/
          super(message, cause);

          this.props = props;

          this.status =
            statusCodeHttp && typeof statusCodeHttp === 'function'
              ? statusCodeHttp(props, data)
              : statusCodeHttp || 500;

          this.errorCode =
            typeof code === 'function'
              ? code(props, this.data, this.status)
              : code;

          this.stackTrace =
            props.stackTrace !== 'off' &&
            enviroment !== 'prod' &&
            this.getStack(props.microService);

          this.extraData = props.extraData || {};

          this.timestamp = props.timestamp || new Date();
        }

        toJSON() {
          return {
            message: this.message,
            status: this.status,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            extraData: this.extraData,

            ...Object.assign(
              {},
              this.stackTrace && { stackTrace: this.stackTrace }
            )
          };
        }

        convertToHttp() {
          return {
            status: this.status,
            message: this.message,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            extraData: this.extraData,
            stackTrace: this.stackTrace
          };
        }
      }

      return ApiErrorImpl;
    };

  static handlerHttp = (error) => {
    console.error(error);

    if (error.convertToHttp) {
      return error.convertToHttp();
    }

    return error;
  };
}

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
      message: ({ name }) => `Not Found ${print(name)}`,
      statusCodeHttp: 404
    }),

    NotImplemented: createError({
      code: errorCodes.NOT_IMPLEMENTED,
      message: ({ detail }) => `Not Implemented ${detail}`,
      statusCodeHttp: 501
    }),

    InvalidData: createError({
      code: errorCodes.INVALID_DATA,
      message: ({ details }) => `Invalid data ${details}`,
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
      message: ({ detail }) => `Unauthorized ${print(detail)}`,
      statusCodeHttp: 401
    }),

    Forbidden: createError({
      code: errorCodes.SERVICE_FORBIDDEN,
      message: ({ detail }) => `Forbidden ${print(detail)}`,
      statusCodeHttp: 403
    }),

    ServiceError: createError({
      code: errorCodes.SERVICE_ERROR,
      message: ({ detail }) => `Service Error ${detail}`,
      statusCodeHttp: 500
    }),

    MongoError: createError({
      code: errorCodes.MONGO_ERROR,
      message: ({ detail }) => `Mongo Error ${detail}`,
      statusCodeHttp: 500
    }),

    CreateError: createError({
      code: errorCodes.CREATE_ERROR,
      message: ({ detail }) => `Cannot create ${detail}}`,
      statusCodeHttp: 500
    }),

    UpdateError: createError({
      code: errorCodes.UPDATE_ERROR,
      message: ({ detail }) => `Cannot update ${detail}}`,
      statusCodeHttp: 500
    }),

    DeleteError: createError({
      code: errorCodes.DELETE_ERROR,
      message: ({ detail }) => `Cannot delete ${detail}}`,
      statusCodeHttp: 500
    })
  };
};

export default ApiError;
