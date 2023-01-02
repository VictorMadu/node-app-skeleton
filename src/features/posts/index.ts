import DependencyInjector from '../../lib/dependency-injector';
import { addMailers } from '../mail';
import { addCreation } from './creation';
import { addDeletion } from './delete';
import { addEdition } from './edit';
import { addQuery } from './get-all';

export function addPostService(DI: DependencyInjector) {
    addMailers(DI);
    addCreation(DI);
    addEdition(DI);
    addDeletion(DI);
    addQuery(DI);
}
