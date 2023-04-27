const { PendienteEstado } = require("./estados");

class FichaPersonalDeExcepciones {
    constructor() {
        this._excepciones = [];
    }
    nuevaExcepcion(nuevaExcepcion) {
        this._excepciones.push(nuevaExcepcion);
    }
    excepciones() {
        return this._excepciones;
    }
    excepcionesAprobadas() {
        return this._excepciones.filter(excepcion => this._elEstadoEsAprobado(excepcion));
    }
    _excepcionesAprobadasPara(fecha) {
        return this._obtenerExepcionesApobadasDe(fecha);
    }
    _obtenerExepcionesApobadasDe(fecha) {
        return this.excepcionesAprobadas().filter(excepcion => this._compararPorIgualdadFechas(fecha, excepcion.fecha()));
    }

    _compararPorIgualdadFechas(fecha, fecha2) {
        return fecha.getTime() === fecha2.getTime();
    }

    checkearLaDisponibilidad(fecha, sueleEstarDisponible) {     
        const excepcionesRelevantes = this._excepcionesAprobadasPara(fecha);
        if (this._hayExcepcionesPara(excepcionesRelevantes)) return  this._excepcionMásRelevante(excepcionesRelevantes).habilitaLaDisponibilidad(fecha, sueleEstarDisponible)
        else return sueleEstarDisponible;
    }

    _excepcionMásRelevante(excepciones) {
        return excepciones[excepciones.length - 1];
    }

    _hayExcepcionesPara(excepciones) {
        return excepciones.length > 0;
    }

    _elEstadoEsAprobado(excepcion) {
        return excepcion.estado() === 'AprobadaEstado';
    }
}

class Excepcion {
    constructor(fecha, motivo) {
        Object.defineProperty(this, '_fecha', {
            value: fecha,
            writable: false,
            configurable: false,
            enumerable: true
          });
        Object.defineProperty(this, '_motivo', {
            value: motivo,
            writable: false,
            configurable: false,
            enumerable: true
        });
        this._comentario = '';
        this._estado = new PendienteEstado();
    }
    fecha() {
        return this._fecha;
    }
    motivo() {
        return this._motivo;
    }
    comentario() {
        return this._comentario;
    }
    estado() {
        return this._estado.constructor.name;
    }
    cambiarEstado(nuevoEstado, comentario){
        this._estado = nuevoEstado;
        if (comentario)  this._comentario = comentario;
    }
    aprobar(comentario) {
        this._estado.aprobar(this, comentario);      
    }
    
    rechazar(comentario) {
        this._estado.rechazar(this, comentario);
    }
    daPermisoParaTrabajarEn(fecha){
        throw "Este método debe ser sobrescrito";
    }
    habilitaLaDisponibilidad(fecha, sueleEstarDisponible) {
        throw "Este método debe ser sobrescrito";
    }
}

class ExcepcionDeAusencia extends Excepcion {
    constructor(fecha, motivo) {
        super(fecha, motivo);
    }
    daPermisoParaTrabajarEn(fecha){
        return fecha.getTime() !== this._fecha.getTime();
    }

    habilitaLaDisponibilidad(fecha, sueleEstarDisponible) {
        return sueleEstarDisponible && this.daPermisoParaTrabajarEn(fecha);
    }
}

class ExepcionDeDisponibilidad extends Excepcion {
    constructor(fecha, motivo) {
        super(fecha, motivo);
    }
    daPermisoParaTrabajarEn(fecha){
        return fecha.getTime() === this._fecha.getTime();
    }
    habilitaLaDisponibilidad(fecha, sueleEstarDisponible) {
        return sueleEstarDisponible || this.daPermisoParaTrabajarEn(fecha);
    }
}




module.exports = { FichaPersonalDeExcepciones, Excepcion, ExcepcionDeAusencia, ExepcionDeDisponibilidad };