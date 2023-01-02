import RestController from '../../../request-handler-adapter/rest-api/controller';
import Method from '../../../request-handler-adapter/rest-api/method';
import Request from '../../../request-handler-adapter/rest-api/request';
import Response from '../../../request-handler-adapter/rest-api/response';
import handleRestError from '../rest-handler-error';
import DeleteService from './service';

export class DeletePost implements RestController {
    constructor(private deleteService: DeleteService) {}

    path = '/v1//posts/:post_id';
    method = Method.DELETE;

    async handle(request: Request, response: Response) {
        try {
            // TODO: Validate fields to be of correct type
            // TODO: Obtain user id from token
            // TODO: Check if authorized user
            const isSuccessful = await this.deleteService.delete(+request.params.post_id);
            response.setStatus(200).send({
                success: isSuccessful,
            });
        } catch (error) {
            handleRestError(error, response);
        }
    }
}
