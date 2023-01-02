import SkeletonDiskDataAccessor, { Table } from '../../../data-accessors/disk/data-accessor';
import Post from '../post';
import PostModel from '../../../data-accessors/disk/models/post';

export default class Repository {
    private tableName = Table.posts;
    constructor(private dbAccessor: SkeletonDiskDataAccessor) {}

    async getPost(postId: number): Promise<Omit<PostModel, 'id'> | undefined> {
        const tableData = await this.dbAccessor.getTableData(this.tableName);
        const postDoc = tableData.store[postId];
        return postDoc;
    }

    async updatePost(postId: number, newPost: Post) {
        const tableData = await this.dbAccessor.getTableData(this.tableName);
        const currentPost = tableData.store[postId];

        delete tableData.indexes.uniqueName[currentPost.uniqueName];

        tableData.store[postId] = { ...currentPost, ...newPost };
        tableData.indexes.uniqueName[newPost.uniqueName] = postId;
    }

    async getUsersToReceiveNotification(postId: number) {
        return [];
    }
}
