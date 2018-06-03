import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import {AUTORIZACION_SCHEMA} from "../entidades/autorizacion/autorizacion.schema";
import {AutorizacionPipe} from "../pipes/autorizacion.pipe";

const NOMBRE_COOKIE = 'token'
const VALOR_COOKIE = 'adrianeguez'

@Controller('Autorizacion')
export class AutorizacionController {

    /**
     * Compara los bodyParams de ese controlador llamados "usuario" y "password"
     * con  adrianeguez y 12345678910 respectivamente. Si el usuario manda esas
     * credenciales va a devolver un mensaje JSON : {mensaje:"ok"} y va a guardar
     * una cookie llamada "token" con el nombre de usuario que siempre va a ser "adrianeguez"
     * @param response
     * @param usuario
     * @returns {any}
     */
    @Post('iniciarSesion')
    iniciarSesion(@Res() response, @Body(new AutorizacionPipe(AUTORIZACION_SCHEMA)) usuario) {
        response.cookie(NOMBRE_COOKIE, VALOR_COOKIE);
        return response.send('OK');
    }

    /**
     * Cambia el valor de la cookie "token" a undefined y devolver un
     * mensaje JSON: {mensaje:"Usted salio del sistema"}
     * @param request
     * @param response
     * @returns {any}
     */
    @Post('cerrarSesion')
    cerrarSesion(@Req() request, @Res() response) {
        const existeCookie = request.cookies[NOMBRE_COOKIE];
        if (existeCookie) {
            response.cookie(NOMBRE_COOKIE, 'undefined');
            return response.send({mensaje: 'Usted salio del sistema'});
        } else {
            return response.send({mensaje: 'Usted no se encuentra logeado en el sistema'});

        }
    }
}