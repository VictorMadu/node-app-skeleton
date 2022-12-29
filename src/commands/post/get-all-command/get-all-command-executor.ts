import PostRepository from '../../../infrastructures/repository/memory/post.repository';
import { GetAllCommandRequest, GetAllCommandResponse } from './get-all-command';

export default class GetAllCommandExecutor {
    constructor(private postRepository: PostRepository) {}

    async execute(request: GetAllCommandRequest): Promise<GetAllCommandResponse> {
        const posts = await this.postRepository.getAll();

        return posts.map((post) => ({
            postId: post.postId.getRaw(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        }));
    }
}
