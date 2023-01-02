import DependencyInjector from '../lib/dependency-injector';
import Config from '../core/config';
import SkeletonDiskDataAccessor from './disk/data-accessor';

export default function addDataAccessor(DI: DependencyInjector) {
    DI.addInstance(
        SkeletonDiskDataAccessor,
        (config: Config) => new SkeletonDiskDataAccessor(config),
        [Config],
    );
}
