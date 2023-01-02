import RestController from '../../../request-handler-adapter/rest-api/controller';
import Method from '../../../request-handler-adapter/rest-api/method';
import Request from '../../../request-handler-adapter/rest-api/request';
import Response from '../../../request-handler-adapter/rest-api/response';
import handleRestError from '../rest-handler-error';
import PostqueryService from './service';

export class GetPosts implements RestController {
    constructor(private postQueryService: PostqueryService) {}

    path = '/v1/posts';
    method = Method.GET;

    async handle(request: Request, response: Response) {
        try {
            // TODO: Validate fields to be of correct type
            // TODO: Obtain user id from token
            // TODO: Check if authorized user

            const page = +request.query.page;
            const pageCount = +request.query.page_count;

            const offset = (page - 1) * pageCount;
            const limit = pageCount;

            const result = await this.postQueryService.getPosts({
                offset,
                limit,
            });

            response.setStatus(200).send({
                success: true,
                data: result.map((item) => ({
                    post_id: item.id,
                    title: item.title,
                    content: item.content,
                    unique_name: item.uniqueName,
                    created_at: item.createdAt,
                })),
            });
        } catch (error) {
            handleRestError(error, response);
        }
    }
}
