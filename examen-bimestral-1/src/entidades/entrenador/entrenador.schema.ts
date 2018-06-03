import * as Joi from 'joi'

export const ENTRENADOR_SCHEMA = Joi
    .object()
    .keys({
        nombres: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        apellidos: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        fechaNacimiento: Joi
            .date()
            .min('1-1-1900')
            .max('now'),
        numeroMedallas: Joi
            .number()
            .integer()
            .greater(-1)
            .less(1000000000),
        campeonActual: Joi
            .boolean()
    });

