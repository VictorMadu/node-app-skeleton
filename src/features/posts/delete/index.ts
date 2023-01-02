import DependencyInjector from '../../../lib/dependency-injector';
import SkeletonDiskDataAccessor from '../../../data-accessors/disk/data-accessor';
import Mailgun from '../../mail/mailgun';
import Repository from './disk-repository';
import Mailer from './mailer';
import { DeletePost } from './rest-controller';
import DeleteService from './service';

export function addDeletion(DI: DependencyInjector) {
    const mailGun = DI.getInstance(Mailgun);
    const dataAccessor = DI.getInstance(SkeletonDiskDataAccessor);
    const deleteService = new DeleteService(new Repository(dataAccessor), new Mailer(mailGun, ''));

    DI.addInstance(DeletePost, () => new DeletePost(deleteService), []);
}
