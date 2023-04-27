class Disponibilidad {
    constructor(dias){
        this._dias = dias;
        Object.freeze(this);
    }
    queDiasEstanHabilitados(){
        return this._dias;
    }
    habilitaATrabajarEl(dia) {
        throw 'Este método debe ser sobrescrito'
    }
}

class DisponibilidadRelacionadaADias extends Disponibilidad {
    constructor(dias){
        super(dias);
    }
    mapearFechaADiaDeLaSemana(fecha) {
        const semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"];
        const diaSemana = fecha.getDay();// Obtener el número del día de la semana (0 = lunes, 1 = martes, ..., 6 = domingo)
        return semana[diaSemana];    
    }
    habilitaATrabajarEl(fecha) {
        return this.queDiasEstanHabilitados().includes(this.mapearFechaADiaDeLaSemana(fecha));
    }
}

class DisponibilidadFinDeSemana extends DisponibilidadRelacionadaADias {
    constructor(){
        super(["Sábado", "Domingo"]);
    }
}

class DisponibilidadSemanal extends DisponibilidadRelacionadaADias {
    constructor(){
        super(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    }
}

class DisponibilidadDiaPuntual extends DisponibilidadRelacionadaADias {
    constructor(dias){
        super(dias);
    }
}

class DisponibilidadDiaDelMes extends Disponibilidad {
    constructor(dias){
        super(dias);
    }
    habilitaATrabajarEl(dia) {
        return this.queDiasEstanHabilitados().includes(dia.getUTCDate());
    }
}

module.exports = { DisponibilidadFinDeSemana, DisponibilidadSemanal, DisponibilidadDiaPuntual, DisponibilidadDiaDelMes };