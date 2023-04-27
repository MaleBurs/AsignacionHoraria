class EstadoExcepcion {
    aprobar() {
        throw "Este método debe ser sobrescrito";
    }
    rechazar() {
        throw "Este método debe ser sobrescrito";
    }
}
class PendienteEstado extends EstadoExcepcion {
    aprobar(unaExcepcion, comentario) {
        unaExcepcion.cambiarEstado(new AprobadaEstado(), comentario);
    }

    rechazar(unaExcepcion, comentario) {
        unaExcepcion.cambiarEstado(new RechazadaEstado(), comentario);
    }
}
class AprobadaEstado extends EstadoExcepcion {
    aprobar() {
        throw ('La excepción ya ha sido aprobada');
    }

    rechazar() {
        throw ('La excepción ya ha sido aprobada');
    }
}
class RechazadaEstado extends EstadoExcepcion {
    aprobar() {
        throw ('La excepción ya ha sido rechazada');
    }

    rechazar() {
        throw ('La excepción ya ha sido rechazada');
    }
}

module.exports = { PendienteEstado, AprobadaEstado, RechazadaEstado };