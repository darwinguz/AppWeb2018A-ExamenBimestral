import {PokemonEntity} from "../pokemon/pokemon.entity";

export class EntrenadorEntity {
    id: number;

    nombres: string;

    apellidos: string;

    fechaNacimiento: Date;

    numeroMedallas: number;

    campeonActual: boolean;

    pokemones: PokemonEntity[];

}