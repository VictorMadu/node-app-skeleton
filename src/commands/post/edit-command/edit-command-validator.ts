import CommandRequest from '../../common/interfaces/command-request';
import { EditCommandRequest, EditCommandResponse } from './edit-command';
import EditCommandExecutor from './edit-command-executor';
import Joi from 'joi';
import obtainValueFromJoi from '../../common/obtain-value-from-joi';

export default class EditCommandWithValidator {
    constructor(private decoratored: EditCommandExecutor) {}

    async execute(request: CommandRequest<EditCommandRequest>): Promise<EditCommandResponse> {
        const schema = Joi.object({
            postId: Joi.string().alphanum().required(),
            title: Joi.string(),
            content: Joi.string(),
        });

        const validatedRequestData = obtainValueFromJoi<EditCommandRequest>(schema, request);
        return this.decoratored.execute(validatedRequestData);
    }
}
