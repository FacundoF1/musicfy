import { errors } from '@errors';
const createError = errors(':: Utils Validators ::');

const required = (
  props = {},
  labels = {},
  nameFn,
  moduleName = 'Validators'
) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (props[key] === undefined || props[key] === null) {
      throw new createError.DataRequired({
        field: labels[key] || key,
        file: moduleName,
        fn: nameFn
      });
    }
  }
};

const validateAttr = (key, value, obj = {}) => {
  if (![undefined, 'undefined', 'null', 'false', ''].includes(value)) {
    obj[key] = value;
  }

  return {
    validateAttr: (k, v) => validateAttr(k, v, obj),
    toObject: () => obj
  };
};

export { required, validateAttr };
