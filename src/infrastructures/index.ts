import DependencyInjector from '../common/dependency-injector';
import Config from '../domain/config';
import PostmarkEmailMessager from './repository/memory/messagers/postmark-email-messager';
import PostRepository from './repository/memory/post.repository';

export default function addInfrastructures(DI: DependencyInjector) {
    DI.addInstance(PostRepository, new PostRepository(DI.getInstance(Config)));
    DI.addInstance(PostmarkEmailMessager, new PostmarkEmailMessager());
}
