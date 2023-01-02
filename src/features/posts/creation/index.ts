import DependencyInjector from '../../../lib/dependency-injector';
import SkeletonDiskDataAccessor from '../../../data-accessors/disk/data-accessor';
import Mailgun from '../../mail/mailgun';
import Repository from './disk-repository';
import Mailer from './mailer';
import { CreatePost } from './rest-controller';
import PostCreationService from './service';
import ValiationRule from './validation-rule';

export function addCreation(DI: DependencyInjector) {
    const mailGun = DI.getInstance(Mailgun);
    const dataAccessor = DI.getInstance(SkeletonDiskDataAccessor);

    const postCreationService = new PostCreationService(
        new Repository(dataAccessor),
        new ValiationRule(),
        new Mailer(mailGun, ''),
    );

    DI.addInstance(CreatePost, () => new CreatePost(postCreationService), []);
}
