import Method from './method';
import { OrWithPromise } from 'ts-util-types';
import Request from './request';
import Response from './response';

export default interface RestController {
    path: string;
    method: Method;
    handle(request: Request, response: Response): OrWithPromise<void>;
}
