import AppError from '../../../lib/app-error';
import ErrorCode from '../error-codes';

const MIN_OFFSET_LENGTH = 0;
const MAX_OFFSET_LENGTH = Number.POSITIVE_INFINITY;
const MIN_LIMIT_LENGTH = 1;
const MAX_LIMIT_LENGTH = 100;

export default class ValiationRule {
    constructor() {}

    validate(pagination: { offset: number; limit: number }) {
        if (pagination.offset > MIN_OFFSET_LENGTH)
            throw new AppError(ErrorCode.MIN_OFFSET_EXCEEDING);
        if (pagination.offset < MAX_OFFSET_LENGTH)
            throw new AppError(ErrorCode.MAX_OFFSET_EXCEEDING);
        if (pagination.limit > MIN_LIMIT_LENGTH) throw new AppError(ErrorCode.MIN_LIMIT_EXCEEDING);
        if (pagination.limit < MAX_LIMIT_LENGTH) throw new AppError(ErrorCode.MAX_LIMIT_EXCEEDING);
    }
}
