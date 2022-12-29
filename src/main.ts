import http from 'http';
import Express from './application/request-handlers/express';
import Config from './domain/config';
import DependencyInjector from './common/dependency-injector';
import addApplication, { setUpServerRequestHandler } from './application';
import addControllers from './controllers';
import addInfrastructures from './infrastructures';
import addDomains from './domain';
import addCommands from './commands';
import Router from './application/router';

async function main() {
    const DI = DependencyInjector.Container;

    addDomains(DI);
    addInfrastructures(DI);
    addCommands(DI);
    addControllers(DI);
    addApplication(DI);

    const config = DI.getInstance(Config);
    const serverRquestHandler = DI.getInstance(Express);
    const router = DI.getInstance(Router);

    setUpServerRequestHandler(DI, serverRquestHandler, router);

    const server = http.createServer(serverRquestHandler.getHandler());
    server.listen(config.port, () => {
        console.log('Server listening on port', config.port);
    });
}

// TODO: Handle error exits
main().catch(console.error);
