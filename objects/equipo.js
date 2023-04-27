class Equipo{

    static esEmpleadosUnParametroNOValido(empleados) {
        return !Array.isArray(empleados) || empleados.length < 2;
    }
    static mensajeDeErrorParametroInvalido() {
        return 'El equipo debe tener al menos dos empleados';
    }
    static validarParametroEmpleados(empleados) {
        if (Equipo.esEmpleadosUnParametroNOValido(empleados)) {
            throw Equipo.mensajeDeErrorParametroInvalido();
        }
    }

    constructor(empleados){
        Equipo.validarParametroEmpleados(empleados);
        this._empleados = empleados;
        Object.freeze(this);
    }

    conocerEmpleados(){
        return this._empleados;
    }
    estaDisponible(fecha){
        return this._empleados.every(empleado => this._estaElEmpleadoDisponible(empleado, fecha));
    }

    _estaElEmpleadoDisponible(empleado, fecha) {
        return empleado.estaDisponible(fecha);
    }
}

module.exports = { Equipo };