import {Injectable} from "@nestjs/common";
import {EntrenadorEntity} from "../entidades/entrenador/entrenador.entity";
import {NoEncontradaException} from "../exceptions/no.encontrada.exception";

@Injectable()
export class EntrenadorService {
    private entrenadores: EntrenadorEntity[] = [];
    private id: number = 0;

    insertar(entrenador: EntrenadorEntity): EntrenadorEntity {
        entrenador.id = ++this.id;
        this.entrenadores.push(entrenador);
        return entrenador;
    }

    seleccionarTodos(): EntrenadorEntity[] {
        return this.entrenadores;
    }

    seleccionarUno(id: number): EntrenadorEntity {
        const entrenador = this.entrenadores.find(item => item.id == id);
        if (entrenador == null) {
            throw new NoEncontradaException({mensaje: `No se ha encontrado la entidad con ID = ${id}`}, 1000)
        } else {
            return entrenador;
        }
    }

    actualizar(id: number, nuevoEntrenador: EntrenadorEntity): EntrenadorEntity {
        let itemActualizar = this.seleccionarUno(id);
        let indice = this.entrenadores.indexOf(itemActualizar);
        nuevoEntrenador.id = id;
        this.entrenadores[indice] = nuevoEntrenador;
        return this.entrenadores[indice];
    }

}
