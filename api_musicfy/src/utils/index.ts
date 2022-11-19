const validateAttr = (key, value, obj = {}) => {
  if (![undefined, 'undefined', 'null', 'false', ''].includes(value)) {
    obj[key] = value;
  }

  return {
    validateAttr: (k, v) => validateAttr(k, v, obj),
    toObject: () => obj
  };
};

export { validateAttr };
