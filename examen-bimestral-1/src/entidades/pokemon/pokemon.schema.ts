import * as Joi from 'joi'

export const POKEMON_SCHEMA = Joi
    .object()
    .keys({
        numeroPokemon: Joi
            .number()
            .integer()
            .greater(0)
            .less(151)
            .required(),
        nombrePokemon: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        poderEspecialUno: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50),
        poderEspecialDos: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50),
        fechaCaptura: Joi
            .date()
            .min('1-1-1900')
            .max('now'),
        nivel: Joi
            .number()
            .integer()
            .greater(0)
            .less(100),
    });

