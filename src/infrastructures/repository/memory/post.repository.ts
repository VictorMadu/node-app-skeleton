import pfs from 'fs/promises';
import Config from '../../../domain/config';
import { Post } from '../../../domain/entities/post';
import PostId from '../../../domain/value-objects/post-id';
import { Repository } from '../../../errors/repository';

export default class PostRepository {
    constructor(private config: Config) {}

    async create(inData: { post: Post }) {
        await this.randomThrow();

        const posts = await this.getPostsFromDisk();
        const newPost = inData.post;

        if (posts[newPost.postId.getRaw()]) throw new Repository.DuplicateError();

        posts[newPost.postId.getRaw()] = {
            postId: newPost.postId.getRaw(),
            title: newPost.title,
            content: newPost.content,
            createdAt: newPost.createdAt,
            deletedAt: null,
        };
        await this.savePostsToDisk(posts);
    }

    async update(inData: { post: Post }) {
        await this.randomThrow();

        const posts = await this.getPostsFromDisk();
        const postToUpdate = inData.post;

        if (posts[postToUpdate.postId.getRaw()]) throw new Repository.NotExistsError();

        posts[postToUpdate.postId.getRaw()] = {
            postId: postToUpdate.postId.getRaw(),
            title: postToUpdate.title,
            content: postToUpdate.content,
            createdAt: postToUpdate.createdAt,
            deletedAt: postToUpdate.deletedAt,
        };
        await this.savePostsToDisk(posts);
    }

    async getOne(inData: { postId: PostId }) {
        await this.randomThrow();

        const posts = await this.getPostsFromDisk();
        const post = posts[inData.postId.getRaw()];

        if (post == null || post.deletedAt) throw new Repository.NotExistsError();
        else return Post.create({ ...post, postId: new PostId(post.postId) });
    }

    async getAll() {
        await this.randomThrow();

        const postsInArr: Omit<Post, 'deletedAt'>[] = [];
        const posts = await this.getPostsFromDisk();
        const postIds = Object.keys(posts);

        for (let i = 0; i < postIds.length; i++) {
            const postId = postIds[i];
            const post = posts[postId];

            if (post.deletedAt) continue;
            else postsInArr.push(Post.create({ ...post, postId: new PostId(post.postId) }));
        }

        return postsInArr;
    }

    private async randomThrow() {
        const random = Math.random();
        if (random > 0.75) return Promise.reject();
    }

    private async getPostsFromDisk(): Promise<
        Record<
            string,
            {
                postId: string;
                title: string;
                content: string;
                createdAt: Date;
                deletedAt: Date | null;
            }
        >
    > {
        const filePath = this.getPostJSONFilePath();
        try {
            const JSONString = await pfs.readFile(filePath, { encoding: 'utf-8' });
            return JSON.parse(JSONString);
        } catch (error) {
            return {};
        }
    }

    private async savePostsToDisk(
        posts: Record<
            string,
            {
                postId: string;
                title: string;
                content: string;
                createdAt: Date;
                deletedAt: Date | null;
            }
        >,
    ) {
        const filePath = this.getPostJSONFilePath();
        await pfs.writeFile(filePath, JSON.stringify(posts));
    }

    private getPostJSONFilePath() {
        return this.config.dbLocation;
    }
}
