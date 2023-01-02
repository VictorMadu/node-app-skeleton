import DependencyInjector from '../lib/dependency-injector';
import { addPostService } from './posts';

export function addFeatures(DI: DependencyInjector) {
    addPostService(DI);
}
