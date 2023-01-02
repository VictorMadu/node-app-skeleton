import RestController from '../../../request-handler-adapter/rest-api/controller';
import Method from '../../../request-handler-adapter/rest-api/method';
import Request from '../../../request-handler-adapter/rest-api/request';
import Response from '../../../request-handler-adapter/rest-api/response';
import handleRestError from '../rest-handler-error';
import PostCreationService from './service';

export class CreatePost implements RestController {
    constructor(private postCreationService: PostCreationService) {}

    path = '/v1/posts';
    method = Method.POST;

    async handle(request: Request, response: Response) {
        try {
            // TODO: Validate fields to be of correct type
            // TODO: Obtain user id from token
            // TODO: Check if authorized user
            const result = await this.postCreationService.create({
                title: request.body.title,
                content: request.body.content,
                uniqueName: request.body.unique_name,
            });

            response.setStatus(201).send({
                success: true,
                data: {
                    post_id: result.postId,
                    title: result.title,
                    content: result.content,
                    created_at: result.createdAt,
                },
            });
        } catch (error) {
            handleRestError(error, response);
        }
    }
}
