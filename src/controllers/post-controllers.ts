import { OrWithPromise } from 'ts-util-types';
import {
    CreateCommandRequest,
    CreateCommandResponse,
} from '../commands/post/create-command/create-command';
import {
    DeleteCommandRequest,
    DeleteCommandResponse,
} from '../commands/post/delete-command/delete-command';
import {
    EditCommandRequest,
    EditCommandResponse,
} from '../commands/post/edit-command/edit-command';
import {
    GetAllCommandRequest,
    GetAllCommandResponse,
} from '../commands/post/get-all-command/get-all-command';
import Command from '../common/interfaces/command';
import Controller, { Request, Response } from '../common/interfaces/controller';
import handleError from './common/handle-error';

export class CreatePost implements Controller {
    constructor(private createCommand: Command<CreateCommandRequest, CreateCommandResponse>) {}

    async handle(request: Request, response: Response) {
        try {
            const result = await this.createCommand.execute({
                title: request.body.title,
                content: request.body.content,
            });

            response.setStatus(201).send({
                success: true,
                data: {
                    post_id: result.postId,
                    title: result.title,
                    content: result.content, // TODO: Duplication, move to common
                },
            });
        } catch (error) {
            handleError(error, response);
        }
    }
}

export class GetPosts implements Controller {
    constructor(private getAllCommand: Command<GetAllCommandRequest, GetAllCommandResponse>) {}

    async handle(request: Request, response: Response) {
        try {
            const result = await this.getAllCommand.execute();

            response.setStatus(200).send({
                success: true,
                data: result.map((item) => ({
                    post_id: item.postId,
                    title: item.title,
                    content: item.content,
                })),
            });
        } catch (error) {
            handleError(error, response);
        }
    }
}

export class EditPost implements Controller {
    constructor(private editCommand: Command<EditCommandRequest, EditCommandResponse>) {}

    async handle(request: Request, response: Response) {
        try {
            const result = await this.editCommand.execute({
                postId: request.params.post_id,
                title: request.body.title,
                content: request.body.content,
            });

            response.setStatus(200).send({
                success: true,
                data: {
                    post_id: result.postId,
                    title: result.title,
                    content: result.content,
                },
            });
        } catch (error) {
            handleError(error, response);
        }
    }
}

export class DeletePost implements Controller {
    constructor(private deleteCommand: Command<DeleteCommandRequest, DeleteCommandResponse>) {}

    async handle(request: Request, response: Response) {
        try {
            const isSuccessful = await this.deleteCommand.execute({
                postId: request.params.post_id,
            });

            response.setStatus(200).send({
                success: isSuccessful,
            });
        } catch (error) {
            handleError(error, response);
        }
    }
}
