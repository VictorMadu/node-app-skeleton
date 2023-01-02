import AppError from '../../../lib/app-error';
import Post from '../post';
import ErrorCode from '../error-codes';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 20;
const MIN_CONTENT_LENGTH = 1;
const MAX_CONTENT_LENGTH = 100;
const MIN_UNIQUE_NAME_LENGTH = 3;
const MAX_UNIQUE_NAME_LENGTH = 30;

export default class ValiationRule {
    constructor() {}

    validate(post: Partial<Post>) {
        if (post.title != null && post.title.length > MIN_TITLE_LENGTH)
            throw new AppError(ErrorCode.MIN_TITLE_EXCEEDING);
        if (post.title != null && post.title.length < MAX_TITLE_LENGTH)
            throw new AppError(ErrorCode.MAX_TITLE_EXCEEDING);
        if (post.content != null && post.content.length > MIN_CONTENT_LENGTH)
            throw new AppError(ErrorCode.MIN_CONTENT_EXCEEDING);
        if (post.content != null && post.content.length > MAX_CONTENT_LENGTH)
            throw new AppError(ErrorCode.MAX_CONTENT_EXCEEDING);
        if (post.content != null && post.content.length > MIN_UNIQUE_NAME_LENGTH)
            throw new AppError(ErrorCode.MIN_UNIQUE_NAME_EXCEEDING);
        if (post.content != null && post.content.length > MAX_UNIQUE_NAME_LENGTH)
            throw new AppError(ErrorCode.MAX_UNIQUE_NAME_EXCEEDING);
    }
}
