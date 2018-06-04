import {Body, Controller, Get, Post, Put, Req, Res} from "@nestjs/common";
import {EntrenadorPipe} from "../pipes/entrenador.pipe";
import {ENTRENADOR_SCHEMA} from "../entidades/entrenador/entrenador.schema";
import {EntrenadorService} from "../servicios/entrenador.service";
import {PeticionErroneaException} from "../exceptions/peticion.erronea.exception";
import {NoEncontradaException} from "../exceptions/no.encontrada.exception";

const Joi = require('joi');

@Controller('Entrenador')
export class EntrenadorController {

    constructor(private _entrenadorService: EntrenadorService) {
    }

    /**
     * Listar todos los entrenadores en el arreglo de entrenadores del servicio Entrenador
     * @param response
     * @returns {any}
     */
    // @Get('listarTodos')
    @Get('/')
    listarTodos(@Res() response) {
        const entrenadores = this._entrenadorService.seleccionarTodos();
        return response.send(entrenadores);
    }


    /**
     * Añade un entrenador al arreglo de entrenadores en el servicio Entrenador con bodyParams
     * @param nuevoEntrenador
     * @returns {any}
     */
    @Post('/')
    crearEntrenador(@Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) nuevoEntrenador) {
        this._entrenadorService.insertar(nuevoEntrenador);
        return nuevoEntrenador;
    }

    /**
     * Busca y devuelve el entrenador con el parámetro de ruta llamado "id" en el arreglo de
     * entrenadores del servicio Entrenador
     * @param request
     * @param response
     * @returns {any}
     */
    @Get('/:id')
    obtenerUno(@Req() request, @Res() response) {
        const schema = Joi.number().greater(0).required();
        const {
            error
        } = Joi.validate(request.params.id, schema)
        if (error) {
            //lanzar un error
            throw new PeticionErroneaException({
                error: error,
                mensaje: 'ID para obtener una entidad no valido'
            }, 10);
        } else {
            //realizo operacion
            const entrenador = this._entrenadorService.seleccionarUno(request.params.id);
            return response.send(entrenador);
        }
    }

    /**
     * Busca el entrenador con el parámetro de ruta llamado "id"  en el arreglo de entrenadores
     * del servicio Entrenador y edita el entrenador con los bodyParams del request
     * @param request
     * @param nuevoEntrenador
     * @returns {any}
     */
    @Put('/:id')
    editarUno(@Req() request, @Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) nuevoEntrenador) {
        const schema = Joi.number().greater(0).required();
        const {
            error
        } = Joi.validate(request.params.id, schema)
        if (error) {
            //lanzar un error
            throw new PeticionErroneaException({
                error: error,
                mensaje: 'ID para editar entidad no valido'
            }, 10);
        } else {
            //realizo operacion
            this._entrenadorService.actualizar(request.params.id, nuevoEntrenador);
            return nuevoEntrenador;
        }
    }
}