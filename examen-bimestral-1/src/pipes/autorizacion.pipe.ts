import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionErroneaException} from "../exceptions/peticion.erronea.exception";

const Joi = require('joi');

@Injectable()
export class AutorizacionPipe implements PipeTransform {
    constructor(private readonly _schema) {

    }

    transform(jsonValidar: any, metadata: ArgumentMetadata) {
        const {
            error
        } = Joi.validate(jsonValidar, this._schema);
        if (error) {
            //lanzar un error
            throw new PeticionErroneaException({
                error: error,
                mensaje: 'Datos de usuario no validos'
            }, 10);
        } else {
            //nada
            return jsonValidar;
        }
    }
}