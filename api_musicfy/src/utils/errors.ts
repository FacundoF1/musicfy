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

export default ApiError;
