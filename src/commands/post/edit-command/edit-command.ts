export interface EditCommandRequest {
    postId: string;
    title?: string;
    content?: string;
}

export interface EditCommandResponse {
    postId: string;
    title: string;
    content: string;
    createdAt: Date;
}
