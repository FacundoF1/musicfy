import { countInstances, Monitor } from './systemCounter';

describe('System Counter 0', () => {
  test('Should return string with counter called 0', (done) => {
    const response = Monitor.printInstances();

    expect(response).toEqual(``);
  });
});

describe('System Counter +1', () => {
  beforeEach(() => {
    @countInstances
    class testDecorator {
      constructor() {}
    }
    new testDecorator();
  });
  test('Should return string with counter called +1', (done) => {
    const response = Monitor.printInstances();

    expect(response).toEqual(`a: 1 \n`);
  });
});
