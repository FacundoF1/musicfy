import { validateAttr } from '@utils/index';

const errorResponseDto = (resource: any): any =>
  validateAttr('message', resource.message)
    .validateAttr('status', resource.status)
    .validateAttr('errorCode', resource.errorCode)
    .validateAttr('timestamp', resource.timestamp)
    .validateAttr('extraData', resource.extraData)
    .validateAttr('stackTrace', resource.stackTrace)
    .toObject();

export { errorResponseDto };
