import RestController from './rest-api/controller';

export default interface RequestHandlerAdapter {
    addMiddleware(): void;
    addController(controller: RestController): void;
    getHandler(): (request: any, response: any) => any;
}
