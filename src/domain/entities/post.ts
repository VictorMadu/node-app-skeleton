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
        post.title = data.title ?? post.title;
        post.content = data.content ?? post.content;
        post.createdAt = data.createdAt ?? post.createdAt;
        post.deletedAt = data.deletedAt ?? post.deletedAt;

        return post;
    }
}
