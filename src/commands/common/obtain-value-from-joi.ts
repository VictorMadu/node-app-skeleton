import Joi from 'joi';
import { Validation } from '../../errors/validation';

export default function obtainValueFromJoi<T extends unknown>(
    JoiSchema: Joi.ObjectSchema<any>,
    data: any,
) {
    const { value: validatedData, error } = JoiSchema.validate(data);
    if (error) {
        throw new Validation(error.message);
    }

    return validatedData as T;
}
