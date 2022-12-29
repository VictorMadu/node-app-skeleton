export default class App {
    static UnSupportedError = class extends Error {
        constructor(message = 'UnSupportedError') {
            super(message);
        }
    };
}
