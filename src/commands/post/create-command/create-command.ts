export interface CreateCommandRequest {
    title: string;
    content: string;
}

export interface CreateCommandResponse {
    postId: string;
    title: string;
    content: string;
    createdAt: Date;
}
