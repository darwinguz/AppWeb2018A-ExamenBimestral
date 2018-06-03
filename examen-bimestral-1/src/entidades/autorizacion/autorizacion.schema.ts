import * as Joi from 'joi'

export const AUTORIZACION_SCHEMA = Joi
    .object()
    .keys({
        usuario: Joi
            .string()
            .regex(/^adrianeguez/),
        password: Joi
            .string()
            .regex(/^12345678910/),
    });

