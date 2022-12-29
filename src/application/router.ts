import DependencyInjector from '../common/dependency-injector';
import RouteAttacher from '../common/interfaces/router';
import { CreatePost, DeletePost, EditPost, GetPosts } from '../controllers/post-controllers';

export default class Router {
    constructor(private routeAttacher: RouteAttacher) {}

    injectControllersToHttpRoutes(DI: DependencyInjector) {
        this.routeAttacher.addPostHandler('/v1/posts', DI.getInstance(CreatePost));
        this.routeAttacher.addGetHandler('/v1/posts', DI.getInstance(GetPosts));
        this.routeAttacher.addPutHandler('/v1/posts/:post_id', DI.getInstance(EditPost));
        this.routeAttacher.addDeleteHandler('/v1/post/:post_id', DI.getInstance(DeletePost));
    }
}
