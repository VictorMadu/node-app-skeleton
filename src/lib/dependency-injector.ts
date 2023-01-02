import { Constructor, ConstructorReturnType } from 'ts-util-types';
import * as _ from 'lodash';

export type DepsConstructor<T extends Object[]> = T extends [infer O, ...infer OO]
    ? [Constructor<O>, ...DepsConstructor<OO>]
    : [];

interface InstanceGetter {
    getInstance<T extends Constructor>(constructor: T): ConstructorReturnType<T>;
}

interface InstanceManager<T extends Object> {
    get(DI: InstanceGetter): T;
}
export default class DependencyInjector implements InstanceGetter {
    private container = new Map<Constructor, InstanceManager<Constructor>>();

    constructor() {}

    addInstance<C extends Constructor, DPI extends Object[]>(
        Identity: C,
        factory: (...dependenciesInstances: DPI) => ConstructorReturnType<C>,
        DependenciesIdentities: DepsConstructor<DPI>,
    ) {
        this.container.set(Identity, new SingletonInstanceManager(factory, DependenciesIdentities));
    }

    addFactory<C extends Constructor, DPI extends Object[]>(
        Identity: C,
        factory: (...dependenciesInstances: DPI) => ConstructorReturnType<C>,
        DependenciesIdentities: DepsConstructor<DPI>,
    ) {
        this.container.set(Identity, new FactoryInstanceManager(factory, DependenciesIdentities));
    }

    getInstance<T extends Constructor>(constructor: T): ConstructorReturnType<T> {
        const instanceManager: InstanceManager<Constructor> | undefined =
            this.container.get(constructor);

        if (instanceManager === undefined)
            throw new Error(constructor.name + ' not added to DI container');
        else return instanceManager.get(this) as ConstructorReturnType<T>;
    }

    static combine(...dependencyInjectors: DependencyInjector[]) {
        const combinedDependencyInjector = new DependencyInjector();
        combinedDependencyInjector.container = new Map(
            ..._.map(dependencyInjectors, (d) => d.container),
        );

        return combinedDependencyInjector;
    }
}

class SingletonInstanceManager<T extends unknown, Deps extends Object[]>
    implements InstanceManager<T>
{
    private instance: T | null = null;

    constructor(
        private factory: (...deps: Deps) => T,
        private constructorOfDeps: DepsConstructor<Deps>,
    ) {}

    get(DI: InstanceGetter): T {
        if (this.instance == null) {
            const dependenciesInstances = this.constructorOfDeps.map((DepConstructor) =>
                DI.getInstance(DepConstructor),
            ) as unknown as Deps;
            this.instance = this.factory(...dependenciesInstances);
        }

        return this.instance;
    }
}

class FactoryInstanceManager<T extends Constructor, Deps extends Object[]>
    implements InstanceManager<T>
{
    private instance: T | null = null;

    constructor(
        private factory: (...deps: Deps) => T,
        private constructorOfDeps: DepsConstructor<Deps>,
    ) {}

    get(DI: InstanceGetter): T {
        const dependenciesInstances = this.constructorOfDeps.map((DepConstructor) =>
            DI.getInstance(DepConstructor),
        ) as unknown as Deps;
        this.instance = this.factory(...dependenciesInstances);
        return this.instance;
    }
}
