import express, {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from 'express';
import helmet from 'helmet';
import { OrWithArray } from 'ts-util-types';
import RequestHandlerAdapter from './request-handler-adapter';
import controller from './rest-api/controller';
import Method from './rest-api/method';
import RestController from './rest-api/controller';
import Request from './rest-api/request';
import Response from './rest-api/response';
import Config from '../core/config';

export default class ExpressAdapter implements RequestHandlerAdapter {
    private app = express();

    constructor(private config: Config) {}

    addController(controller: controller): void {
        console.log('CONTROLLER METHOD', controller.method);
        this.restControllerAttacher[controller.method](controller);
    }

    addMiddleware() {
        this.app.use(helmet());
        this.app.use(this.getCorsMiddleware());
        this.app.use(express.json());
    }

    private restControllerAttacher = {
        [Method.GET]: (controller: RestController) =>
            this.app.route(controller.path).get(this.createHandlerFn(controller)),
        [Method.POST]: (controller: RestController) =>
            this.app.route(controller.path).post(this.createHandlerFn(controller)),
        [Method.PUT]: (controller: RestController) =>
            this.app.route(controller.path).put(this.createHandlerFn(controller)),
        [Method.PATCH]: (controller: RestController) =>
            this.app.route(controller.path).patch(this.createHandlerFn(controller)),
        [Method.DELETE]: (controller: RestController) =>
            this.app.route(controller.path).delete(this.createHandlerFn(controller)),
        [Method.OPTIONS]: (controller: RestController) =>
            this.app.route(controller.path).options(this.createHandlerFn(controller)),
        [Method.HEAD]: (controller: RestController) =>
            this.app.route(controller.path).head(this.createHandlerFn(controller)),
    };

    getHandler() {
        return this.app;
    }

    private getCorsMiddleware() {
        return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            const method = req.method?.toUpperCase?.();
            const origin = req.headers['origin'];

            if (origin != null && this.config.allowedOrigins.has(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                res.setHeader('Access-Control-Allow-Headers', '*');
            }

            if (method === 'OPTIONS') {
                return res.status(204).setHeader('Content-Length', '0').end();
            } else return next();
        };
    }

    private createHandlerFn(controller: RestController) {
        return async (req: ExpressRequest, res: ExpressResponse) => {
            console.log('BODY', req.body);
            console.log('QUERY', req.query);
            console.log('PARAMS', req.params);
            console.log('PATH', req.path);
            console.log('URL', req.url);

            const controllerRequest = this.getControllerRequest(req);
            const controllerResponse = this.getControllerResponse(res);

            try {
                await controller.handle(controllerRequest, controllerResponse);
            } catch (error) {
                console.error(error);
                // TODO: Log and alert about error

                controllerResponse.setStatus(500).send({ success: false, error: 'UNKNWON_ERROR' });
            }
        };
    }

    private getControllerRequest(expressRequest: ExpressRequest): Request {
        return {
            headers: expressRequest.headers,
            query: expressRequest.query as Record<string, OrWithArray<string>>,
            params: expressRequest.params,
            body: expressRequest.body,
            remoteAddress: expressRequest.socket.remoteAddress,
        };
    }

    private getControllerResponse(expressResponse: ExpressResponse): Response {
        const response = {
            setStatus: (statusCode: number) => {
                expressResponse.status(statusCode);
                return response;
            },

            addHeader: (field: string, value?: OrWithArray<string>) => {
                expressResponse.setHeader(field, value);
                return response;
            },

            writeAsync: async (body: any) => {
                const hasMoreRoom = expressResponse.write(body);

                if (hasMoreRoom) return;
                else
                    return new Promise<void>((resolve) => {
                        expressResponse.on('drain', resolve);
                    });
            },

            send: (body: any) => {
                expressResponse.send(body);
            },

            end: () => {
                expressResponse.end();
            },
        };

        return response;
    }
}
