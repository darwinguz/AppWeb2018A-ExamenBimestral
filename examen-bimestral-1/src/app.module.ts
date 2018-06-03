import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EntrenadorController} from "./entrenador.controller";
import {EntrenadorService} from "./entrenador.service";

@Module({
    imports: [],
    controllers: [
        AppController,
        EntrenadorController],
    providers: [
        AppService,
        EntrenadorService],
})
export class AppModule {
}
