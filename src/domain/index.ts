import DependencyInjector from '../common/dependency-injector';
import Config from './config';

export default function addDomains(DI: DependencyInjector) {
    DI.addInstance(Config, new Config());
}
