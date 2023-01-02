export default interface PostModel {
    id: number;
    title: string;
    uniqueName: string;
    content: string;
    createdAt: Date;
    deletedAt: Date | null;
}
