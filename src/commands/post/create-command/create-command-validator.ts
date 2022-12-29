import CommandRequest from '../../common/interfaces/command-request';
import { CreateCommandRequest, CreateCommandResponse } from './create-command';
import CreateCommandExecutor from './create-command-executor';
import Joi from 'joi';
import obtainValueFromJoi from '../../common/obtain-value-from-joi';

export default class CreateCommandWithValidator {
    constructor(private decoratored: CreateCommandExecutor) {}

    async execute(request: CommandRequest<CreateCommandRequest>): Promise<CreateCommandResponse> {
        const schema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
        });

        const validatedRequestData = obtainValueFromJoi<CreateCommandRequest>(schema, request);
        return this.decoratored.execute(validatedRequestData);
    }
}
