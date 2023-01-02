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

    async deletePost(postId: number) {
        const tableData = await this.dbAccessor.getTableData(this.tableName);
        const currentPost = tableData.store[postId];

        delete tableData.indexes.uniqueName[currentPost.uniqueName];

        const currentTime = new Date();
        tableData.store[postId] = { ...currentPost, deletedAt: currentTime };

        return currentTime;
    }

    async getUsersToReceiveNotification(postId: number) {
        return [];
    }
}
