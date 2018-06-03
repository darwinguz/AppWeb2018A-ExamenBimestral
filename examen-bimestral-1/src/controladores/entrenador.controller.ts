import {Body, Controller, Get, Post, Put, Req, Res} from "@nestjs/common";
import {EntrenadorPipe} from "../pipes/entrenador.pipe";
import {ENTRENADOR_SCHEMA} from "../entidades/entrenador/entrenador.schema";
import {EntrenadorService} from "../servicios/entrenador.service";

@Controller('Entrenador')
export class EntrenadorController {

    constructor(private _entrenadorService: EntrenadorService) {
    }

    /**
     * Listar todos los entrenadores en el arreglo de entrenadores del servicio Entrenador
     * @param response
     * @returns {any}
     */
    @Get('listarTodos')
    listarTodos(@Res() response) {
        const entrenadores = this._entrenadorService.seleccionarTodos();
        return response.send(entrenadores);
    }


    /**
     * Añade un entrenador al arreglo de entrenadores en el servicio Entrenador con bodyParams
     * @param nuevoEntrenador
     * @returns {any}
     */
    @Post('crearEntrenador')
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
    @Get('obtenerUno/:id')
    obtenerUno(@Req() request, @Res() response) {
        const entrenador = this._entrenadorService.seleccionarUno(request.params.id);
        return response.send(entrenador);
    }

    /**
     * Busca el entrenador con el parámetro de ruta llamado "id"  en el arreglo de entrenadores
     * del servicio Entrenador y edita el entrenador con los bodyParams del request
     * @param request
     * @param nuevoEntrenador
     * @returns {any}
     */
    @Put('editarUno/:id')
    editarUno(@Req() request, @Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) nuevoEntrenador) {
        this._entrenadorService.actualizar(request.params.id, nuevoEntrenador);
        return nuevoEntrenador;
    }
}