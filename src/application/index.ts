import http from 'http';

import { addFeatures } from '../features';
import ExpressAdapter from '../request-handler-adapter/express';
import { CreatePost } from '../features/posts/creation/rest-controller';
import DependencyInjector from '../lib/dependency-injector';
import Config from '../core/config';
import { EditPost } from '../features/posts/edit/rest-controller';
import { DeletePost } from '../features/posts/delete/rest-controller';
import { GetPosts } from '../features/posts/get-all/rest-controller';
import RequestHandlerAdapter from '../request-handler-adapter/request-handler-adapter';
import { addCore } from '../core';
import addDataAccessor from '../data-accessors';

let server: http.Server;

export async function startApp(DI: DependencyInjector) {
    addCore(DI);
    addDataAccessor(DI);
    addFeatures(DI);

    const config = DI.getInstance(Config);
    const express = new ExpressAdapter(config);

    attachRestController(DI, express);

    server = http.createServer(express.getHandler());
    const pendingServerListen = new Promise<RequestHandlerAdapter>((resolve, reject) => {
        server.on('listening', () => resolve(express));
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

function attachRestController(DI: DependencyInjector, requestHandler: RequestHandlerAdapter) {
    requestHandler.addMiddleware();
    requestHandler.addController(DI.getInstance(CreatePost));
    requestHandler.addController(DI.getInstance(EditPost));
    requestHandler.addController(DI.getInstance(GetPosts));
    requestHandler.addController(DI.getInstance(DeletePost));
}
