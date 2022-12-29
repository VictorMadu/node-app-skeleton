export type GetAllCommandRequest = void;

export type GetAllCommandResponse = {
    postId: string;
    title: string;
    content: string;
    createdAt: Date;
}[];
