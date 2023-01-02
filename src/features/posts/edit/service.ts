import Post from '../post';
import Repository from './disk-repository';
import ValiationRule from './validation-rule';
import Mailer from './mailer';
import AppError from '../../../lib/app-error';
import ErrorCode from '../error-codes';

export default class EditService {
    constructor(
        private repository: Repository,
        private validationRule: ValiationRule,
        private mailer: Mailer,
    ) {}

    async edit(postId: number, post: Partial<Post>) {
        this.validationRule.validate(post);

        const postDoc = await this.repository.getPost(postId);
        if (postDoc.deletedAt != null) throw new AppError(ErrorCode.NOT_EXISTS);

        postDoc.title = post.title ?? postDoc.title;
        postDoc.content = post.content ?? postDoc.content;
        postDoc.uniqueName = post.uniqueName ?? postDoc.uniqueName;

        await this.repository.updatePost(postId, postDoc);
        const receiverEmails = await this.repository.getUsersToReceiveNotification(postId);
        await this.mailer.send(postId, receiverEmails);

        return {
            postId,
            title: post.title,
            content: post.content,
            createdAt: postDoc.createdAt,
        };
    }
}
