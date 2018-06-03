import {HttpException, HttpStatus} from "@nestjs/common";


export class NoEncontradaException extends HttpException {
    constructor(private readonly _mensaje, private readonly _nivelError) {
        super({
            mensaje: 'Peticion no encontrada',
            statusCode: HttpStatus.NOT_FOUND,
            nivelError: _nivelError,
            detalle: _mensaje
        }, HttpStatus.BAD_REQUEST)
    }
}