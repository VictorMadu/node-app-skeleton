import http from 'http';
import DependencyInjector from '../common/dependency-injector';
import { NullErrorHandler } from '../common/interfaces/controller';
import Config from '../domain/config';
import Router from './router';
import addCommands from '../commands';
import addControllers from '../controllers';
import addDomains from '../domain';
import addInfrastructures from '../infrastructures';
import RequestHandlerManager from './request-handlers/request-handler-manager';

let server: http.Server;

export async function startApp(DI: DependencyInjector) {
    addDomains(DI);
    addInfrastructures(DI);
    addCommands(DI);
    addControllers(DI);
    addApplication(DI);

    const config = DI.getInstance(Config);
    const serverRequestHandler = DI.getInstance(RequestHandlerManager);
    const router = DI.getInstance(Router);

    serverRequestHandler.addHelmet();
    serverRequestHandler.addCors();
    serverRequestHandler.addRequestBodyParser();
    serverRequestHandler.setErrorHandler(new NullErrorHandler());

    router.injectControllersToHttpRoutes(DI);

    server = http.createServer(serverRequestHandler.getHandler());

    const pendingServerListen = new Promise((resolve, reject) => {
        server.on('listening', resolve);
        server.on('error', reject);

        server.listen(config.port, () => {
            console.log('Server listening on port', config.port);
        });
    });

    return pendingServerListen;
}

export async function closeApp(DI: DependencyInjector) {
    const pendingServerClose = new Promise((resolve, reject) => {
        server.on('close', resolve);
        server.on('error', reject);

        server.close();
    });

    return pendingServerClose;
}

function addApplication(DI: DependencyInjector) {
    DI.addInstance(RequestHandlerManager, new RequestHandlerManager(DI.getInstance(Config)));
    DI.addInstance(Router, new Router(DI.getInstance(RequestHandlerManager)));
}
