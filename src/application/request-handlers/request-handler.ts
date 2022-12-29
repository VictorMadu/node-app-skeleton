import Router from '../../common/interfaces/router';
import { ErrorHandler, Request } from '../../common/interfaces/controller';

export default interface RequestHandler extends Router {
    addHelmet(): void;
    addCors(): void;
    addRequestBodyParser(): void;
    getHandler(): (request: any, response: any) => any;
    setErrorHandler(errorHandler: ErrorHandler): void;
}
