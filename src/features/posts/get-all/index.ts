import DependencyInjector from '../../../lib/dependency-injector';
import SkeletonDiskDataAccessor from '../../../data-accessors/disk/data-accessor';
import Repository from './disk-repository';
import { GetPosts } from './rest-controller';
import PostqueryService from './service';
import ValiationRule from './validation-rule';

export function addQuery(DI: DependencyInjector) {
    const dataAccessor = DI.getInstance(SkeletonDiskDataAccessor);
    const postqueryService = new PostqueryService(
        new Repository(dataAccessor),
        new ValiationRule(),
    );

    DI.addInstance(GetPosts, () => new GetPosts(postqueryService), []);
}
