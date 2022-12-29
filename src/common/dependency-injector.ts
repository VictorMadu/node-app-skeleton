import { Constructor, ConstructorReturnType } from 'ts-util-types';

export default class DependencyInjector {
    private container = new Map<Object, () => Object>();
    private constructor() {}

    static Container = new DependencyInjector();

    addInstance<T extends Constructor>(constructor: T, instance: ConstructorReturnType<T>) {
        this.container.set(constructor, () => instance);
    }

    addFactory<T extends Constructor>(constructor: T, factory: () => ConstructorReturnType<T>) {
        this.container.set(constructor, factory);
    }

    getInstance<T extends Constructor>(constructor: T): ConstructorReturnType<T> {
        const factory = this.container.get(constructor) as () =>
            | ConstructorReturnType<T>
            | undefined;

        if (factory === undefined) throw new Error(constructor.name + ' not added to DI container');

        return factory();
    }
}
