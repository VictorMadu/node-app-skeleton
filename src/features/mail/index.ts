import DependencyInjector from '../../lib/dependency-injector';
import Mailgun from './mailgun';

export function addMailers(DI: DependencyInjector) {
    DI.addInstance(Mailgun, () => new Mailgun(), []);
}
