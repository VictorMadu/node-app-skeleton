import PostId from '../../../domain/value-objects/post-id';
import PostRepository from '../../../infrastructures/repository/memory/post.repository';
import { DeleteCommandRequest, DeleteCommandResponse } from './delete-command';

export default class DeleteCommandExecutor {
    constructor(private postRepository: PostRepository) {}

    async execute(request: DeleteCommandRequest): Promise<DeleteCommandResponse> {
        const post = await this.postRepository.getOne({ postId: new PostId(request.postId) });

        post.deletedAt = new Date();
        await this.postRepository.update({ post });
        return true;
    }
}
