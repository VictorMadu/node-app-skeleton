import Router from './router';
import { ErrorHandler, Request } from './controller';

export interface RequestHandler extends Router {
    addHelmet(): void;
    addCors(): void;
    addRequestBodyParser(): void;
    getHandler(): (request: any, response: any) => any;
    setErrorHandler(errorHandler: ErrorHandler): void;
}
