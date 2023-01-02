import { IncomingHttpHeaders } from 'http';
import { OrWithArray } from 'ts-util-types';

export default interface Response {
    setStatus: (statusCode: number) => this;
    addHeader: (field: string, value?: OrWithArray<string>) => this;
    writeAsync: (body: any) => Promise<void>;
    send(body: any): void;
    end(): void;

    // TODO: Add error listener
}
