export default class AppError extends Error {
    constructor(public code: number) {
        super();
    }
}
