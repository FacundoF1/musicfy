class Counter {
  static objectsCount: Map<string, number> = new Map();

  static increment(className: string) {
    const currentValue = this.objectsCount.get(className);
    !currentValue
      ? this.objectsCount.set(className, 1)
      : this.objectsCount.set(className, currentValue! + 1);
  }
}
export class Monitor {
  public static printInstances(): string {
    let response = '';
    Counter.objectsCount.forEach((value: number, key: string) => {
      response = response + `${key}: ${value} \n`;
    });
    return response;
  }
}

export function countInstances<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    abc = Counter.increment(constructor.name);
  };
}
