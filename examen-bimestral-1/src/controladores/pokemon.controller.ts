import {Body, Controller, Get, Post, Put, Req, Res} from "@nestjs/common";
import {EntrenadorPipe} from "../pipes/entrenador.pipe";
import {ENTRENADOR_SCHEMA} from "../entidades/entrenador/entrenador.schema";
import {PokemonService} from "../servicios/pokemon.service";
import {POKEMON_SCHEMA} from "../entidades/pokemon/pokemon.shema";
import {PokemonPipe} from "../pipes/pokemon.pipe";

@Controller('Pokemon')
export class PokemonController {

    constructor(private _pokemonService: PokemonService) {
    }

    /**
     * Listar todos los pokemones en el arreglo de pokemones del servicio Pokemon
     * @param response
     * @returns {any}
     */
    @Get('listarTodos')
    listarTodos(@Res() response) {
        const pokemones = this._pokemonService.seleccionarTodos();
        return response.send(pokemones);
    }


    /**
     * Añade un pokemon al arreglo de pokemones en el servicio Pokemon con bodyParams
     * @param nuevoPokemon
     * @returns {any}
     */
    @Post('crearPokemon')
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
    @Get('obtenerUno/:id')
    obtenerUno(@Req() request, @Res() response) {
        const pokemon = this._pokemonService.seleccionarUno(request.params.id);
        return response.send(pokemon);
    }

    /**
     * Busca el pokemon con el parámetro de ruta llamado "id"  en el arreglo de pokemones
     * del servicio Pokemon y edita el pokemon con los bodyParams del request
     * @param request
     * @param nuevoPokemon
     * @returns {any}
     */
    @Put('editarUno/:id')
    editarUno(@Req() request, @Body(new PokemonPipe(POKEMON_SCHEMA)) nuevoPokemon) {
        this._pokemonService.actualizar(request.params.id, nuevoPokemon);
        return nuevoPokemon;
    }
}