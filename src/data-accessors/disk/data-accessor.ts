import pfs from 'fs/promises';
import Config from '../../core/config';
import PostModel from './models/post';

export type Id = number;

export enum Table {
    posts,
}

const metaDataOfTables = {
    [Table.posts]: {
        name: 'posts',
        initialData: {
            store: {} as Record<Id, Omit<PostModel, 'id'>>,
            lastInsertId: -1,
            indexes: {
                uniqueName: {} as Record<string, Id>,
            },
        },
    },
};

type TableData<T extends Table> = typeof metaDataOfTables[T]['initialData'];

export default class SkeletonDiskDataAccessor {
    constructor(private config: Config) {}

    async getTableData<T extends Table>(table: T): Promise<TableData<T>> {
        const allData = await this.readAll();
        const tableMeta = metaDataOfTables[table];
        return allData[tableMeta.name] ?? tableMeta.initialData;
    }

    async saveTableData<T extends Table>(table: T, tableData: TableData<T>) {
        const allData = await this.readAll();
        const tableMeta = metaDataOfTables[table];
        allData[tableMeta.name] = tableData;

        await this.writeAll(allData);
    }

    private async readAll(): Promise<Record<string, any>> {
        try {
            const filePath = this.getFilePath();

            const rawData = await pfs
                .stat(filePath)
                .catch(() => pfs.writeFile(filePath, JSON.stringify({})))
                .then(() => pfs.readFile(filePath, { encoding: 'utf-8' }));
            const allData = JSON.parse(rawData);
            return allData;
        } catch (error) {
            throw error;
            // TODO: Check what caused the error and throw more suitable error class
        }
    }

    private async writeAll(dataToWrite: Record<string, any>): Promise<void> {
        try {
            const filePath = this.getFilePath();
            const rawData = JSON.stringify(dataToWrite);
            await pfs.writeFile(filePath, rawData);
        } catch (error) {
            throw error;
            // TODO: Check what caused the error and throw more suitable error class
        }
    }

    private getFilePath() {
        return this.config.db.skeleton.path;
    }
}
