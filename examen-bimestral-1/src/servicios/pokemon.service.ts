import {Injectable} from "@nestjs/common";
import {PokemonEntity} from "../entidades/pokemon/pokemon.entity";
import {NoEncontradaException} from "../exceptions/no.encontrada.exception";

@Injectable()
export class PokemonService {
    private pokemones: PokemonEntity[] = [];
    private id: number = 0;

    insertar(pokemon: PokemonEntity): PokemonEntity {
        pokemon.id = ++this.id;
        this.pokemones.push(pokemon);
        return pokemon;
    }

    seleccionarTodos(): PokemonEntity[] {
        return this.pokemones;
    }

    seleccionarUno(id: number): PokemonEntity {
        const pokemon = this.pokemones.find(item => item.id == id);
        if (pokemon == null) {
            throw new NoEncontradaException({mensaje: `No se ha encontrado la entidad con ID = ${id}`}, 1000)
        } else {
            return pokemon;
        }
    }

    actualizar(id: number, nuevoPokemon: PokemonEntity): PokemonEntity {
        let itemActualizar = this.seleccionarUno(id);
        let indice = this.pokemones.indexOf(itemActualizar);
        nuevoPokemon.id = id;
        this.pokemones[indice] = nuevoPokemon;
        return this.pokemones[indice];
    }

}
