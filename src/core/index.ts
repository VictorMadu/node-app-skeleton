import DependencyInjector from '../lib/dependency-injector';
import Config from './config';

export function addCore(DI: DependencyInjector) {
    DI.addInstance(Config, () => new Config(), []);
}
