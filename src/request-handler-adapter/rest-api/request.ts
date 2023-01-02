import { IncomingHttpHeaders } from 'http';
import { OrWithArray } from 'ts-util-types';

export default interface Request {
    headers: IncomingHttpHeaders;
    query: Record<string, OrWithArray<string>> | undefined;
    params: Record<string, string> | undefined;
    body: any;
    remoteAddress: string | undefined;
}
