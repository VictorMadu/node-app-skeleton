import Post from '../post';
import PostCreationRepository from './disk-repository';
import ValiationRule from './validation-rule';
import Mailer from './mailer';

export default class PostCreationService {
    constructor(
        private repository: PostCreationRepository,
        private validationRule: ValiationRule,
        private mailer: Mailer,
    ) {}

    async create(post: { title: string; content: string; uniqueName: string }) {
        this.validationRule.validate(post);

        const { postId, createdAt } = await this.repository.createPost(post);
        const receiverEmails = await this.repository.getUsersToReceiveNotification(postId);
        await this.mailer.send(postId, receiverEmails);

        return {
            postId,
            title: post.title,
            content: post.content,
            createdAt,
        };
    }
}
