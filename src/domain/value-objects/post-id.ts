import * as uuid from 'uuid';

export default class PostId {
    constructor(private id: string = uuid.v4()) {}

    isEqual(postId: PostId) {
        return postId.id === this.id;
    }

    getRaw(): string | null {
        return this.id as string | null;
    }

    isNull(): this is { getRaw(): null } {
        return this.id == null;
    }
}
