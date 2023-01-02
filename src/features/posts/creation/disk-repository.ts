import AppError from '../../../lib/app-error';
import SkeletonDiskDataAccessor, { Table } from '../../../data-accessors/disk/data-accessor';
import Post from '../post';
import ErrorCode from '../error-codes';

export default class Repository {
    private tableName = Table.posts;
    constructor(private dbAccessor: SkeletonDiskDataAccessor) {}

    async createPost(post: Post) {
        const tableData = await this.dbAccessor.getTableData(this.tableName);

        if (tableData.indexes.uniqueName[post.uniqueName] != null)
            throw new AppError(ErrorCode.UNIQUE_NAME_DUPLICATION);

        const currentTime = new Date();
        tableData.store[++tableData.lastInsertId] = {
            title: post.title,
            uniqueName: post.uniqueName,
            content: post.content,
            createdAt: currentTime,
            deletedAt: null,
        };

        await this.dbAccessor.saveTableData(this.tableName, tableData);

        return { postId: tableData.lastInsertId, createdAt: currentTime };
    }

    async getUsersToReceiveNotification(postId: number) {
        return [];
    }
}
