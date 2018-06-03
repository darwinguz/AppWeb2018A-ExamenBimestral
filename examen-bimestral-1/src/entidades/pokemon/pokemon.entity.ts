import {EntrenadorEntity} from "../entrenador/entrenador.entity";

export class PokemonEntity {
    id: number;

    numeroPokemon: number;

    nombrePokemon: string;

    poderEspecialUno: string;

    poderEspecialDos: string;

    fechaCaptura: Date;

    nivel: number;

    entrenador: EntrenadorEntity;
}