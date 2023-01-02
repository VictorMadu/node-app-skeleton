import { startApp, closeApp } from './application';
import DependencyInjector from './lib/dependency-injector';

async function main() {
    const DI = new DependencyInjector();
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
