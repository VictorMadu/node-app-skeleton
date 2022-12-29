import { startApp, closeApp } from './application';
import DependencyInjector from './common/dependency-injector';

const DI = DependencyInjector.Container;

async function main() {
    let code = 0;

    try {
        await startApp(DI);
    } catch (error) {
        code = 1;
        await closeApp(DI);
    } finally {
        process.exit(code);
    }
}

// TODO: Handle error exits
main();
