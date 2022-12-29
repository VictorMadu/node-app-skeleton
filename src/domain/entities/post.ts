import PostId from '../value-objects/post-id';

export class Post {
    postId: PostId;
    title: string;
    content: string;
    createdAt: Date;
    deletedAt: Date | null;

    static create(data: Partial<Post> & { postId: PostId }) {
        const post = new Post();

        post.postId = data.postId;
        post.postId = data.postId;
        post.postId = data.postId;
        post.postId = data.postId;

        return post;
    }
}
