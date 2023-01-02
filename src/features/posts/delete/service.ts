import Post from '../post';
import Repository from './disk-repository';
import ValiationRule from './validation-rule';
import Mailer from './mailer';
import AppError from '../../../lib/app-error';
import ErrorCode from '../error-codes';

export default class DeleteService {
    constructor(private repository: Repository, private mailer: Mailer) {}

    async delete(postId: number) {
        const postDoc = await this.repository.getPost(postId);
        if (postDoc.deletedAt != null) throw new AppError(ErrorCode.NOT_EXISTS);

        const deletedAt = await this.repository.deletePost(postId);
        const receiverEmails = await this.repository.getUsersToReceiveNotification(postId);
        await this.mailer.send(postId, receiverEmails);

        return {
            postId,
            deletedAt: postDoc.deletedAt,
        };
    }
}
