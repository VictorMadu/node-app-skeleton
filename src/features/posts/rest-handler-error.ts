import AppError from '../../lib/app-error';
import ErrorCode from './error-codes';
import Response from '../../request-handler-adapter/rest-api/response';

export default function handleRestError(error: unknown, response: Response) {
    console.log('ERROR', error);
    if (error instanceof AppError) {
        const handler = handlerObj[error.code] ?? defaultHandler;
        handler(response);
    } else if (error instanceof Error) {
        throw error;
    } else {
        throw error;
    }
}

const defaultHandler = (response: Response) =>
    response.setStatus(500).send({ success: false, error: 'UNKNOWN_ERROR' });
const handlerObj = {
    [ErrorCode.UNIQUE_NAME_DUPLICATION]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'UNIQUE_NAME_DUPLICATION' }),
    [ErrorCode.MIN_TITLE_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MIN_TITLE_EXCEEDING' }),
    [ErrorCode.MAX_TITLE_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MAX_TITLE_EXCEEDING' }),
    [ErrorCode.MIN_CONTENT_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MIN_CONTENT_EXCEEDING' }),
    [ErrorCode.MAX_CONTENT_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MAX_CONTENT_EXCEEDING' }),
    [ErrorCode.MIN_UNIQUE_NAME_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MIN_UNIQUE_NAME_EXCEEDING' }),
    [ErrorCode.MAX_UNIQUE_NAME_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MAX_UNIQUE_NAME_EXCEEDING' }),
    [ErrorCode.NOT_EXISTS]: (response: Response) =>
        response.setStatus(404).send({ success: false, error: 'NOT_EXISTS' }),
    [ErrorCode.MIN_LIMIT_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MIN_LIMIT_EXCEEDING' }),
    [ErrorCode.MAX_LIMIT_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MAX_LIMIT_EXCEEDING' }),
    [ErrorCode.MIN_OFFSET_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MIN_OFFSET_EXCEEDING' }),
    [ErrorCode.MAX_OFFSET_EXCEEDING]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'MAX_OFFSET_EXCEEDING' }),
    [ErrorCode.INVALID_CONTENT_DATA_TYPE]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'INVALID_CONTENT_DATA_TYPE' }),
    [ErrorCode.INVALID_UNIQUE_NAME_DATA_TYPE]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'INVALID_UNIQUE_NAME_DATA_TYPE' }),
    [ErrorCode.INVALID_TITLE_DATA_TYPE]: (response: Response) =>
        response.setStatus(400).send({ success: false, error: 'INVALID_TITLE_DATA_TYPE' }),
};
