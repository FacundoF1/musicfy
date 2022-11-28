class Monitor {
  public static printInstances(): any {
    return '';
  }
}

function countInstances<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    abc = null;
  };
}

export default {
  Monitor,
  countInstances
};
