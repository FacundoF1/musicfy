// @Tools

const omitExtraData = ({ ...error } = {}) => {
  const errors = error['errors'].map(omitExtraData);
  return { ...error, errors };
};

function TestTools(services) {
  const mockImplementation = (name = '', fn: never | any) => {
    try {
      // const [service, fnName] = name.split('.');
      const mock = jest.spyOn(fn, name);
      mock.mockImplementation(fn);
      return mock;
    } catch (error) {
      console.error(`Error mockImplementation(${name})`);
      throw error;
    }
  };

  return {
    mockImplementation,

    Mock: (list) => {
      const mock =
        list &&
        [list].map((name) => mockImplementation(Object.keys(name)[0], name));

      return {
        mockRestore: () => {
          if (mock) {
            mock.map((elm) => elm.mockRestore());
          }
        }
      };
    },

    testThrowError: async (list = [], fn, ...args) => {
      const result: any[] = await Promise.all(
        list.map(async (functionThrowable) => {
          const message = `${functionThrowable} Error`;
          const mock = mockImplementation(functionThrowable, () => {
            throw new Error(message);
          });
          let res;

          try {
            await fn(...args);
            res = `${functionThrowable} Failed`;
          } catch (error) {
            if (error.message !== message) {
              res = `${functionThrowable} Failed`;
            }
          }

          mock.mockRestore();

          return res;
        })
      );

      return result;
    },

    mockResponse: (): any => {
      const res = {};
      res['status'] = jest.fn().mockReturnValue(res);
      res['json'] = jest.fn().mockReturnValue(res);
      res['send'] = jest.fn().mockReturnValue(res);
      res['end'] = jest.fn().mockReturnValue(res);
      return res;
    },

    mockNext: (data): any => jest.fn().mockReturnValue(data),

    mockRequest: (
      body: object = {},
      query: object = {},
      params: object = {}
    ): any => {
      return {
        file: { path: 'filename', filename: 'file.mp3' },
        body,
        query,
        params
      };
    }
  };
}

TestTools.expectError = (error, expectedError) => {
  const errorJson = error?.toJSON ? omitExtraData(error.toJSON()) : error;
  const expectedErrorJson = expectedError?.toJSON
    ? omitExtraData(expectedError.toJSON())
    : expectedError;

  return expect(errorJson).toEqual(expectedErrorJson);
};

TestTools.MockProxy = new Proxy({}, { get: () => null });

export default TestTools;
