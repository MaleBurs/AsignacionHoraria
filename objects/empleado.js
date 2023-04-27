const { FichaPersonalDeExcepciones } = require('./excepciones');
class Persona {
    constructor(nombre){
        this._nombre = nombre;
    }
    comoSeLlama(){
        return this._nombre;
    }
}
class Empleado extends Persona{
    static mesajeDeErrorNombreInvalido() {
        return "Un empleado debe tener un nombre";
    }
    
    static validarParametroNombre(nombre) {
        if (!nombre)
            throw Empleado.mesajeDeErrorNombreInvalido();
    }
    constructor(nombre, disponibilidad){
        Empleado.validarParametroNombre(nombre); 
        super(nombre);
        this._disponibilidad = disponibilidad;
        this._fichaPersonalDeExcepciones = new FichaPersonalDeExcepciones();
        Object.freeze(this);
    }

    _validarFechaEnBaseALaDisponibilidad(fecha) {
        return this._disponibilidad.some(disp => disp.habilitaATrabajarEl(fecha));
    }

    levantarExcepcion(nuevaExcepcion){
        this._fichaPersonalDeExcepciones.nuevaExcepcion(nuevaExcepcion);
    }
    estaDisponible(fecha){
        return this._fichaPersonalDeExcepciones.checkearLaDisponibilidad(fecha, this._validarFechaEnBaseALaDisponibilidad(fecha)) 
    }
}

class Gerente extends Persona {
    constructor(nombre){
        super(nombre);
    }
    aprobarExcepcion(excepcion, comentario){
        excepcion.aprobar(comentario);
    }
    rechazarExcepcion(excepcion, comentario){
        excepcion.rechazar(comentario);
    }

}

module.exports = { Empleado, Gerente };