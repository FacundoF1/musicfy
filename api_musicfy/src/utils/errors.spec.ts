import ApiError from './errors';

import { TestTool } from '@utils/index';
const testTool = TestTool(ApiError);

import { errors } from '@utils/errors.common';
const createError = errors(':: Album Errors ::');

describe('Error utils', () => {
  test('Should return object error', (done) => {
    const response = new ApiError('Error util', 'Test');

    expect(response.cause).toEqual('Test');
    expect(response.message).toEqual('Error util');
    done();
  });

  test('getStack: Should return object error', (done) => {
    const response = new ApiError('Error util', 'Test');

    expect(response.getStack()).toEqual([
      'Error: Error util',
      '    at Object.<anonymous> (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/src/utils/errors.spec.ts:19:35)',
      '    at Promise.then.completed (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/utils.js:281:26)',
      '    at new Promise (<anonymous>)',
      '    at callAsyncCircusFn (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/utils.js:222:10)',
      '    at _callCircusTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:248:40)',
      '    at processTicksAndRejections (node:internal/process/task_queues:96:5)',
      '    at _runTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:184:3)',
      '    at _runTestsForDescribeBlock (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:86:9)',
      '    at _runTestsForDescribeBlock (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:81:9)',
      '    at run (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:26:3)',
      '    at runAndTransformResultsToJestFormat (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:120:21)',
      '    at jestAdapter (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)',
      '    at runTestInternal (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/runTest.js:367:16)',
      '    at runTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/runTest.js:444:34)',
      '    at Object.worker (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/testWorker.js:106:12)',
      'Caused by  undefined'
    ]);
    done();
  });

  test('printStack: Should return object error', (done) => {
    const response = new ApiError('Error util', 'Test');
    expect(response.printStack('Test')).toEqual(`Error: Error util
    at Object.<anonymous> (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/src/utils/errors.spec.ts:44:35)
    at Promise.then.completed (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/utils.js:281:26)
    at new Promise (<anonymous>)
    at callAsyncCircusFn (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/utils.js:222:10)
    at _callCircusTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:248:40)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at _runTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:184:3)
    at _runTestsForDescribeBlock (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:86:9)
    at _runTestsForDescribeBlock (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:81:9)
    at run (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/run.js:26:3)
    at runAndTransformResultsToJestFormat (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:120:21)
    at jestAdapter (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
    at runTestInternal (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/runTest.js:367:16)
    at runTest (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/runTest.js:444:34)
    at Object.worker (/media/mnt/Multimedia/Dev/examenes/musicfy/api_musicfy/node_modules/jest-runner/build/testWorker.js:106:12)
Caused by TEST undefined`);
    done();
  });

  test('getStackMessage string: Should return object error', (done) => {
    const response = new ApiError(() => 'Error util', 'Test');

    expect(response.getStackMessage({ stack: 'Error util' })).toEqual([
      'Error util'
    ]);
    done();
  });

  test('getStackMessage function: Should return object error', (done) => {
    const response = new ApiError(() => 'Error util', 'Test');

    expect(response.getStackMessage({ stack: ['Error util'] })).toEqual([
      'Error util'
    ]);
    done();
  });
});
