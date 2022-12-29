import { IncomingHttpHeaders } from 'http';
import { OrWithArray, OrWithPromise } from 'ts-util-types';

export interface Request {
    headers: IncomingHttpHeaders;
    query: Record<string, OrWithArray<string>> | undefined;
    params: Record<string, string> | undefined;
    body: any;
    remoteAddress: string | undefined;
}

export interface Response {
    setStatus: (statusCode: number) => this;
    addHeader: (field: string, value?: OrWithArray<string>) => this;
    writeAsync: (body: any) => Promise<void>;
    send(body: any): void;
    end(): void;

    // TODO: Add error listener
}

// TODO: Move ErrorHandlers out of here. Also add error listeners for logging and alerting. Implement errors of different levels and kinds
export interface ErrorHandler {
    handle(error: unknown, request: Request): OrWithPromise<void>;
    getResponseData(): any;
}

export class NullErrorHandler implements ErrorHandler {
    handle(error: unknown, request: Request): OrWithPromise<void> {}
    getResponseData() {
        return 'UNKNWON_ERROR';
    }
}

export default interface Controller {
    handle(request: Request, response: Response): OrWithPromise<void>;
}
