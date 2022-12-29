export class Repository {
    static DuplicateError = class extends Error {
        constructor(message = 'DuplicateError') {
            super(message);
        }
    };

    static NotExistsError = class extends Error {
        constructor(message = 'NotExistsError') {
            super(message);
        }
    };
}
