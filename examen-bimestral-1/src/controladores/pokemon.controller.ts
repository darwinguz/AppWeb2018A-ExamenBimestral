import {Body, Controller, Get, Post, Put, Req, Res} from "@nestjs/common";
import {PokemonService} from "../servicios/pokemon.service";
import {PokemonPipe} from "../pipes/pokemon.pipe";
import {PeticionErroneaException} from "../exceptions/peticion.erronea.exception";
import {POKEMON_SCHEMA} from "../entidades/pokemon/pokemon.schema";

const Joi = require('joi');

@Controller('Pokemon')
export class PokemonController {

    constructor(private _pokemonService: PokemonService) {
    }

    /**
     * Listar todos los pokemones en el arreglo de pokemones del servicio Pokemon
     * @param response
     * @returns {any}
     */
    // @Get('/')
    @Get()
    listarTodos(@Res() response) {
        const pokemones = this._pokemonService.seleccionarTodos();
        return response.send(pokemones);
    }


    /**
     * Añade un pokemon al arreglo de pokemones en el servicio Pokemon con bodyParams
     * @param nuevoPokemon
     * @returns {any}
     */
    // @Post('/')
    @Post()
    crearEntrenador(@Body(new PokemonPipe(POKEMON_SCHEMA)) nuevoPokemon) {
        this._pokemonService.insertar(nuevoPokemon);
        return nuevoPokemon;
    }

    /**
     * Busca y devuelve el pokemon con el parámetro de ruta llamado "id" en el arreglo de
     * pokemons del servicio Pokemon
     * @param request
     * @param response
     * @returns {any}
     */
    // @Get('/:id')
    @Get(':id')
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
            const pokemon = this._pokemonService.seleccionarUno(request.params.id);
            return response.send(pokemon);
        }
    }

    /**
     * Busca el pokemon con el parámetro de ruta llamado "id"  en el arreglo de pokemones
     * del servicio Pokemon y edita el pokemon con los bodyParams del request
     * @param request
     * @param nuevoPokemon
     * @returns {any}
     */
    // @Put('/:id')
    @Put(':id')
    editarUno(@Req() request, @Body(new PokemonPipe(POKEMON_SCHEMA)) nuevoPokemon) {
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
            this._pokemonService.actualizar(request.params.id, nuevoPokemon);
            return nuevoPokemon;
        }
    }
}