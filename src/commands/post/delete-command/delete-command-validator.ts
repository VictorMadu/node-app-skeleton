import CommandRequest from '../../common/interfaces/command-request';
import { DeleteCommandRequest, DeleteCommandResponse } from './delete-command';
import DeleteCommandExecutor from './delete-command-executor';
import Joi from 'joi';
import obtainValueFromJoi from '../../common/obtain-value-from-joi';

export default class DeleteCommandWithValidator {
    constructor(private decoratored: DeleteCommandExecutor) {}

    async execute(request: CommandRequest<DeleteCommandRequest>): Promise<DeleteCommandResponse> {
        const schema = Joi.object({
            postId: Joi.string().alphanum().required(),
        });

        const validatedRequestData = obtainValueFromJoi<DeleteCommandRequest>(schema, request);
        return this.decoratored.execute(validatedRequestData);
    }
}
