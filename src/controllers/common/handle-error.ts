import { Response } from '../../common/interfaces/controller';
import { Validation } from '../../errors/validation';

export default function handleError(error: unknown, response: Response) {
    if (error instanceof Validation) {
        // TODO: Throw error with error code. From error code craft a better response error data
        response.setStatus(400).send({ success: false, error: error.message });
    } else throw error;
}
