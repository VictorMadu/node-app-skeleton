import Post from '../post';
import Repository from './disk-repository';
import AppError from '../../../lib/app-error';
import ErrorCode from '../error-codes';
import ValiationRule from './validation-rule';

export default class PostqueryService {
    constructor(private repository: Repository, private validationRule: ValiationRule) {}

    async getPosts(pagination: { offset: number; limit: number }) {
        this.validationRule.validate(pagination);
        const activePostDocs = await this.repository.getAllActivePost(pagination);
        return activePostDocs;
    }
}
