enum ErrorCode {
    UNIQUE_NAME_DUPLICATION,
    MIN_TITLE_EXCEEDING,
    MAX_TITLE_EXCEEDING,
    MIN_CONTENT_EXCEEDING,
    MAX_CONTENT_EXCEEDING,
    MIN_UNIQUE_NAME_EXCEEDING,
    MAX_UNIQUE_NAME_EXCEEDING,
    NOT_EXISTS,
    MIN_LIMIT_EXCEEDING,
    MAX_LIMIT_EXCEEDING,
    MIN_OFFSET_EXCEEDING,
    MAX_OFFSET_EXCEEDING,
    INVALID_TITLE_DATA_TYPE,
    INVALID_UNIQUE_NAME_DATA_TYPE,
    INVALID_CONTENT_DATA_TYPE,
}

export default ErrorCode;
