import Controller from './controller';

export default interface RouteAttacher {
    addGetHandler(path: string, controller: Controller): void;
    addPostHandler(path: string, controller: Controller): void;
    addPutHandler(path: string, controller: Controller): void;
    addPatchHandler(path: string, controller: Controller): void;
    addDeleteHandler(path: string, controller: Controller): void;
    addHeadHandler(path: string, controller: Controller): void;
    addOptionsHandler(path: string, controller: Controller): void;
}
