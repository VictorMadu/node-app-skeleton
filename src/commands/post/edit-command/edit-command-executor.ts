import { Post } from '../../../domain/entities/post';
import PostId from '../../../domain/value-objects/post-id';
import PostRepository from '../../../infrastructures/repository/memory/post.repository';
import { EditCommandRequest, EditCommandResponse } from './edit-command';

export default class EditCommandExecutor {
    constructor(private postRepository: PostRepository) {}

    async execute(request: EditCommandRequest): Promise<EditCommandResponse> {
        const post = await this.postRepository.getOne({ postId: new PostId(request.postId) });

        post.title = request.title ?? post.title;
        post.content = request.content ?? post.content;

        await this.postRepository.update({ post });
        return {
            postId: post.postId.getRaw(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        };
    }
}
