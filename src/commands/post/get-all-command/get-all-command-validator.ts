import CommandRequest from '../../common/interfaces/command-request';
import { GetAllCommandRequest, GetAllCommandResponse } from './get-all-command';
import GetCommandExecutor from './get-all-command-executor';
import Joi from 'joi';
import obtainValueFromJoi from '../../common/obtain-value-from-joi';

export default class GetAllCommandWithValidator {
    constructor(private decoratored: GetCommandExecutor) {}

    async execute(request: CommandRequest<GetAllCommandRequest>): Promise<GetAllCommandResponse> {
        return this.decoratored.execute();
    }
}
