import RestController from '../../../request-handler-adapter/rest-api/controller';
import Method from '../../../request-handler-adapter/rest-api/method';
import Request from '../../../request-handler-adapter/rest-api/request';
import Response from '../../../request-handler-adapter/rest-api/response';
import handleRestError from '../rest-handler-error';
import EditService from './service';

export class EditPost implements RestController {
    constructor(private postEditService: EditService) {}

    path = '/v1/posts/:post_id';
    method = Method.PUT;

    async handle(request: Request, response: Response) {
        try {
            // TODO: Validate fields to be of correct type
            // TODO: Obtain user id from token
            // TODO: Check if authorized user
            const result = await this.postEditService.edit(+request.params.post_id, {
                title: request.body.title,
                content: request.body.content,
                uniqueName: request.body.unique_name,
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
            handleRestError(error, response);
        }
    }
}
