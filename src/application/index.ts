import { RequestHandler } from '../common/interfaces/request-handler';
import Method from '../common/constants/method';
import DependencyInjector from '../common/dependency-injector';
import { NullErrorHandler } from '../common/interfaces/controller';
import { CreatePost } from '../controllers/post-controllers';
import Config from '../domain/config';
import Express from './request-handlers/express';
import Router from './router';

export default function addApplication(DI: DependencyInjector) {
    DI.addInstance(Express, new Express(DI.getInstance(Config)));
    DI.addInstance(Router, new Router(DI.getInstance(Express)));
}

export function setUpServerRequestHandler(
    DI: DependencyInjector,
    serverRequestHandler: RequestHandler,
    router: Router,
) {
    serverRequestHandler.addHelmet();
    serverRequestHandler.addCors();
    serverRequestHandler.addRequestBodyParser();

    router.injectControllersToHttpRoutes(DI);

    serverRequestHandler.setErrorHandler(new NullErrorHandler());
}
