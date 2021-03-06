import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EntrenadorController} from "./controladores/entrenador.controller";
import {EntrenadorService} from "./servicios/entrenador.service";
import {PokemonController} from "./controladores/pokemon.controller";
import {PokemonService} from "./servicios/pokemon.service";
import {AutorizacionController} from "./controladores/autorizacion.controller";

@Module({
    imports: [],
    controllers: [
        AppController,
        EntrenadorController,
        PokemonController,
        AutorizacionController],
    providers: [
        AppService,
        EntrenadorService,
        PokemonService],
})
export class AppModule {
}
