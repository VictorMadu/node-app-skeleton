import SkeletonDiskDataAccessor, { Table } from '../../../data-accessors/disk/data-accessor';
import PostModel from '../../../data-accessors/disk/models/post';

export default class Repository {
    private tableName = Table.posts;
    constructor(private dbAccessor: SkeletonDiskDataAccessor) {}

    async getAllActivePost(pagination: { offset: number; limit: number }): Promise<PostModel[]> {
        const { offset, limit } = pagination;
        const tableData = await this.dbAccessor.getTableData(this.tableName);
        const ids = Object.keys(tableData.store).slice(offset, offset + limit);

        return ids
            .map((id) => ({
                id,
                ...tableData.store[id],
            }))
            .filter((post: PostModel) => post.deletedAt != null);
    }
}
