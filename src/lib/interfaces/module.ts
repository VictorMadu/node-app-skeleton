import DependencyInjector from '../dependency-injector';

export default interface Module {
    create(DI: DependencyInjector): void;
}
