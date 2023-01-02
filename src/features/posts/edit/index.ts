import DependencyInjector from '../../../lib/dependency-injector';
import SkeletonDiskDataAccessor from '../../../data-accessors/disk/data-accessor';
import Mailgun from '../../mail/mailgun';
import Repository from './disk-repository';
import Mailer from './mailer';
import { EditPost } from './rest-controller';
import EditService from './service';
import ValiationRule from './validation-rule';

export function addEdition(DI: DependencyInjector) {
    const mailGun = DI.getInstance(Mailgun);
    const dataAccessor = DI.getInstance(SkeletonDiskDataAccessor);
    const editService = new EditService(
        new Repository(dataAccessor),
        new ValiationRule(),
        new Mailer(mailGun, ''),
    );

    DI.addInstance(EditPost, () => new EditPost(editService), []);
}
