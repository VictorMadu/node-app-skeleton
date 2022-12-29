import Command from '../../../common/interfaces/command';
import Messager from '../../../common/interfaces/infrastructures/messager';
import { Post } from '../../../domain/entities/post';
import PostId from '../../../domain/value-objects/post-id';
import PostRepository from '../../../infrastructures/repository/memory/post.repository';
import { CreateCommandRequest, CreateCommandResponse } from './create-command';

export default class CreateCommandExecutor
    implements Command<CreateCommandRequest, CreateCommandResponse>
{
    constructor(private postRepository: PostRepository, private emailMessager: Messager) {}

    async execute(request: CreateCommandRequest): Promise<CreateCommandResponse> {
        const post = Post.create({
            postId: new PostId(),
            title: request.title,
            content: request.content,
            createdAt: new Date(),
        });

        await this.postRepository.create({ post });
        this.emailMessager.sendMessage(
            `New post with id ${post.postId.getRaw()} has been created`,
            'everyone',
        );

        return {
            postId: post.postId.getRaw(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        };
    }
}
