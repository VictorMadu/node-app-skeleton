import express, {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction,
} from 'express';
import helmet from 'helmet';
import { OrWithArray } from 'ts-util-types';
import Controller, {
    ErrorHandler,
    NullErrorHandler,
    Request,
    Response,
} from '../../common/interfaces/controller';
import RequestHandler from './request-handler';
import Config from '../../domain/config';

export default class Express implements RequestHandler {
    private app = express();
    private errorHandler: ErrorHandler = new NullErrorHandler();

    constructor(private config: Config) {}

    addHelmet(): void {
        this.app.use(helmet());
    }

    addCors(): void {
        this.app.use(this.getCorsMiddleware());
    }

    addRequestBodyParser(): void {
        this.app.use(express.json());
    }

    addGetHandler(path: string, controller: Controller): void {
        this.app.route(path).get(this.createHandlerFn(controller));
    }

    addPostHandler(path: string, controller: Controller): void {
        this.app.route(path).post(this.createHandlerFn(controller));
    }

    addPutHandler(path: string, controller: Controller): void {
        this.app.route(path).put(this.createHandlerFn(controller));
    }

    addPatchHandler(path: string, controller: Controller): void {
        this.app.route(path).patch(this.createHandlerFn(controller));
    }

    addDeleteHandler(path: string, controller: Controller): void {
        this.app.route(path).delete(this.createHandlerFn(controller));
    }

    addHeadHandler(path: string, controller: Controller): void {
        this.app.route(path).head(this.createHandlerFn(controller));
    }

    addOptionsHandler(path: string, controller: Controller): void {
        this.app.route(path).options(this.createHandlerFn(controller));
    }

    setErrorHandler(errorHandler: ErrorHandler) {
        this.errorHandler = errorHandler;
    }

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

    private createHandlerFn(controller: Controller) {
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
                await this.errorHandler.handle(error, controllerRequest);
                const responseData = this.errorHandler.getResponseData();

                controllerResponse.setStatus(500).send({ success: false, error: responseData });
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
