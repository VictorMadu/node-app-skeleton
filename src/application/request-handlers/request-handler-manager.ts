import Controller, { ErrorHandler } from '../../common/interfaces/controller';
import RequestHandler from './request-handler';
import Config from '../../domain/config';
import Express from './express';

// TODO: We can create something like a reflect that will be generic
export default class RequestHandlerManager implements RequestHandler {
    private requestHandler: RequestHandler;

    constructor(private config: Config) {
        this.requestHandler = new Express(config);
    }

    addHelmet(): void {
        return this.requestHandler.addHelmet();
    }

    addCors(): void {
        return this.requestHandler.addCors();
    }

    addRequestBodyParser(): void {
        return this.requestHandler.addRequestBodyParser();
    }

    addGetHandler(path: string, controller: Controller): void {
        return this.requestHandler.addGetHandler(path, controller);
    }

    addPostHandler(path: string, controller: Controller): void {
        return this.requestHandler.addPostHandler(path, controller);
    }

    addPutHandler(path: string, controller: Controller): void {
        return this.requestHandler.addPutHandler(path, controller);
    }

    addPatchHandler(path: string, controller: Controller): void {
        return this.requestHandler.addPatchHandler(path, controller);
    }

    addDeleteHandler(path: string, controller: Controller): void {
        return this.requestHandler.addDeleteHandler(path, controller);
    }

    addHeadHandler(path: string, controller: Controller): void {
        return this.requestHandler.addHeadHandler(path, controller);
    }

    addOptionsHandler(path: string, controller: Controller): void {
        return this.requestHandler.addOptionsHandler(path, controller);
    }

    setErrorHandler(errorHandler: ErrorHandler) {
        return this.requestHandler.setErrorHandler(errorHandler);
    }

    getHandler() {
        return this.requestHandler.getHandler();
    }
}
