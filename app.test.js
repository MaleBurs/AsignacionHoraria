const { Equipo } =require('./objects/equipo');
const {Empleado, Gerente} = require('./objects/empleado');
const { DisponibilidadFinDeSemana, DisponibilidadSemanal, DisponibilidadDiaDelMes, DisponibilidadDiaPuntual}  = require('./objects/disponibilidad');
const {FichaPersonalDeExcepciones, Excepcion, ExcepcionDeAusencia, ExepcionDeDisponibilidad} = require('./objects/excepciones');
/*Defino empleados*/
const empleado1 = new Empleado("Juan", [new DisponibilidadSemanal(), new DisponibilidadDiaDelMes([1, 15]), new DisponibilidadDiaPuntual(["Sábado"])]);
const empleado2 = new Empleado("Pedro", [new DisponibilidadFinDeSemana(), new DisponibilidadDiaPuntual(["Lunes", "Jueves", "Viernes"])]);
const empleado3 = new Empleado("Luis", [new DisponibilidadFinDeSemana()]);

/*Defino un equipo*/
const equipo = new Equipo([empleado1, empleado2, empleado3]);

/*Tests*/
test('Un equipo tiene un conjunto de empleados', () => {
    expect(equipo.conocerEmpleados()).toEqual([empleado1, empleado2, empleado3]);
    expect(equipo.conocerEmpleados()).toBeInstanceOf(Array);
    expect(equipo.conocerEmpleados()[0]).toBeInstanceOf(Empleado);
});

test("Un equipo no puede cambiar su conjunto de empleados", () => {
    const empleado4 = new Empleado("Ana");
    const empleado5 = new Empleado("María");
    equipo._empleados = [empleado4, empleado5];

    expect(equipo.conocerEmpleados()).toEqual([empleado1, empleado2, empleado3]);
});

test("Un equipo debe tener al menos un empleado", () => {
    expect(() => new Equipo([])).toThrow('El equipo debe tener al menos dos empleados');
}); 

test("Un empleado tiene un nombre", () => {
    const empleado = new Empleado("Juan");
    expect(empleado.comoSeLlama()).toBe("Juan");
});

test("Un empleado no puede cambiar su nombre", () => {
    const empleado = new Empleado("Juan");
    empleado._nombre = "Pedro";
    expect(empleado.comoSeLlama()).toBe("Juan");
});

test("Un empleado debe tener un nombre", () => {
    expect(() => new Empleado()).toThrow('Un empleado debe tener un nombre');
});

test("La disponibilidad los fines de semana refiere a disponibilidad los sábados y domingos", () => {
    const disponibilidad = new DisponibilidadFinDeSemana();
    expect(disponibilidad.queDiasEstanHabilitados()).toEqual(["Sábado", "Domingo"]);
});
test("El 23/04/2023 cae en el fin de semana",()=>{
    const disponibilidad = new DisponibilidadFinDeSemana();
    expect(disponibilidad.habilitaATrabajarEl(new Date("2023-04-23"))).toBe(true);
})
test("El 24/04/2023 no cae en el fin de semana",()=>{
    const disponibilidad = new DisponibilidadFinDeSemana();
    expect(disponibilidad.habilitaATrabajarEl(new Date("2023-04-24"))).toBe(false);
})
test("La disponibilidad semanal refiere a disponibilidad de lunes a viernes", () => {
    const disponibilidad = new DisponibilidadSemanal();
    expect(disponibilidad.queDiasEstanHabilitados()).toEqual(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
});
test("El 23/04/2023 no cae en la semana",()=>{
    const disponibilidad = new DisponibilidadSemanal();
    expect(disponibilidad.habilitaATrabajarEl(new Date("2023-04-23"))).toBe(false);
})
test("El 24/04/2023 cae en la semana",()=>{
    const disponibilidad = new DisponibilidadSemanal();
    expect(disponibilidad.habilitaATrabajarEl(new Date("2023-04-24"))).toBe(true);
}
)
test("La disponibilidad de un día puntual refiere a disponibilidad de un día en particular como Martes", () => {
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes"]);
    expect(disponibilidad.queDiasEstanHabilitados()).toEqual(["Martes"]);
});
test("La disponibilidad de algunos días puntuales refiere a disponibilidad de algunos días en particular como Martes o Jueves", () => {
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes", "Jueves"]);
    expect(disponibilidad.queDiasEstanHabilitados()).toEqual(["Martes", "Jueves"]);
});
test("Si el usuario tiene disponibilidad Martes y Jueves, el usuario no esta disponible el 23/04/2023",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes", "Jueves"]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    expect(empleado.estaDisponible(new Date("2023-04-23"))).toBe(false);
})
test("Si el usuario tiene disponibilidad Martes y Jueves, el usuario esta disponible el 25/04/2023",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes", "Jueves"]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(true);
})
test("Si el usuario esta disponible todos los 1 de cada mes, el usuario esta disponible el 1/04/2023",()=>{
    const disponibilidad = new DisponibilidadDiaDelMes([1]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    expect(empleado.estaDisponible(new Date("2023-04-01"))).toBe(true);
})
test("Si el usuario esta disponible todos los 1,5 y 6 de cada mes, el usuario esta disponible el 5/04/2023",()=>{
    const disponibilidad = new DisponibilidadDiaDelMes([1,5,6]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    expect(empleado.estaDisponible(new Date("2023-04-05"))).toBe(true);
})
test("Si el usuario esta disponible todos los 1,5 y 6 de cada mes, el usuario no esta disponible el 2/04/2023",()=>{
    const disponibilidad = new DisponibilidadDiaDelMes([1,5,6]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    expect(empleado.estaDisponible(new Date("2023-04-02"))).toBe(false);
})
test("Un Empleado no puede cambiar su disponibilidad", () => {
    const disponibilidad = new DisponibilidadFinDeSemana();
    const empleado = new Empleado("Juan", [disponibilidad]);
    empleado._disponibilidad = new DisponibilidadFinDeSemana();
    expect(empleado._disponibilidad).toStrictEqual([disponibilidad]);
});
test("Un Empleado puede tener una combinacion de disponibilidades, si disponibilidad puede referis al fin de semana y a un día particular como Martes", () => {
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadDiaPuntual(["Martes"]);
    const empleado = new Empleado("Juan", [disponibilidad1, disponibilidad2]);
    expect(empleado._disponibilidad).toStrictEqual([disponibilidad1, disponibilidad2]);
});
test("Un Empleado puede estar disponible el sabado 23/04/2023 y el martes 25/04/2023", () => {
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadDiaPuntual(["Martes"]);
    const empleado = new Empleado("Juan", [disponibilidad1, disponibilidad2]);
    expect(empleado.estaDisponible(new Date("2023-04-23"))).toBe(true);
});
test("Un equipo no está disponible si no todos sus empleados están disponibles", () => {
    expect(equipo.estaDisponible(new Date("2023-04-26"))).toBe(false);
});
test("Un equipo está disponible si todos sus empleados estan disponibles", () => {
    expect(equipo.estaDisponible(new Date("2023-04-22"))).toBe(true);
});
test("Una exepción se crea para el dia 23/04/2023 por enfermedad", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    expect(excepcion.fecha()).toEqual(new Date("2023-04-23"));
    expect(excepcion.motivo()).toBe("Enfermedad");
});
test("Una excepcion se crea como pendiente de aprobación", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    expect(excepcion.estado()).toBe("PendienteEstado");
});
test("Una expecion se crea sin ningún comentario", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    expect(excepcion.comentario()).toBe("");
});
test("No se puede alterar la fecha de la excepcion creada", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    excepcion._fecha = new Date("2023-04-24");
    expect(excepcion.fecha()).toEqual(new Date("2023-04-23"));
});
test("No se puede alterar el motivo de la excepcion creada", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    excepcion._motivo = "Vacaciones";
    expect(excepcion.motivo()).toBe("Enfermedad");
});
test("El fichero de excepciones se crea vacio", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    expect(ficheroExcepciones.excepciones()).toEqual([]);
}
)
test("Al generar una excepcion el fichero de excepciones almacena la misma", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    ficheroExcepciones.nuevaExcepcion(new Excepcion(new Date("2023-04-23"), "Enfermedad"));
    expect(ficheroExcepciones.excepciones()).toEqual([new Excepcion(new Date("2023-04-23"), "Enfermedad")]);
});
test("El fichero de excepciones puede contener mas de una excepcion", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    ficheroExcepciones.nuevaExcepcion(new Excepcion(new Date("2023-04-23"), "Enfermedad"));
    ficheroExcepciones.nuevaExcepcion(new Excepcion(new Date("2023-04-24"), "Vacaciones"));
    expect((ficheroExcepciones.excepciones()).length>1).toBe(true);
});
test("Un empleado solicita una excepcion para el 23/04/2023 por enfermedad", () => {
    const empleado = new Empleado("Juan", [new DisponibilidadFinDeSemana()]);
    empleado.levantarExcepcion(new Excepcion (new Date("2023-04-23"), "Enfermedad"));
    expect(empleado._fichaPersonalDeExcepciones.excepciones()).toEqual([new Excepcion(new Date("2023-04-23"), "Enfermedad")]);
});
test("Un empleado solicita una excepcion para el 23/04/2023 por enfermedad y el 24/04/2023 por vacaciones", () => {
    const empleado = new Empleado("Juan", [new DisponibilidadFinDeSemana()]);
    empleado.levantarExcepcion(new Excepcion (new Date("2023-04-23"), "Enfermedad"));
    empleado.levantarExcepcion(new Excepcion (new Date("2023-04-24"), "Vacaciones"));
    expect(empleado._fichaPersonalDeExcepciones.excepciones()).toEqual([new Excepcion(new Date("2023-04-23"), "Enfermedad"), new Excepcion(new Date("2023-04-24"), "Vacaciones")]);
});
test("Un gerente tiene un nombre, por ejemplo Pablo", () => {
    const gerente = new Gerente("Pablo");
    expect(gerente.comoSeLlama()).toBe("Pablo");
});
test("Un gerente puede aprobar una excepcion", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(excepcion.estado()).toBe("AprobadaEstado");
});
test("Un gerente puede rechazar una excepcion", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(excepcion.estado()).toBe("RechazadaEstado");
});
test("Una excepcion aprobada no puede ser rechazada", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(()=>gerente.rechazarExcepcion(excepcion)).toThrow('La excepción ya ha sido aprobada');
})
test("Una excepcion aprobada no puede ser vuelta a aprobar", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(()=>gerente.aprobarExcepcion(excepcion)).toThrow('La excepción ya ha sido aprobada');
})
test("Una excepcion rechazada no puede ser aprobada", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(()=>gerente.aprobarExcepcion(excepcion)).toThrow('La excepción ya ha sido rechazada');
})
test("Una excepcion rechazada no puede ser vuelta a rechazar", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(()=>gerente.rechazarExcepcion(excepcion)).toThrow('La excepción ya ha sido rechazada');
})
test("Al aprobar una excepcion un gerente puede dejar un comentario", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion, "Perfecto!");
    expect(excepcion.comentario()).toBe("Perfecto!");
});
test("Al rechazar una excepcion un gerente puede dejar un comentario", () => {
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion, "No puede ser!");
    expect(excepcion.comentario()).toBe("No puede ser!");
});
test("Un fichero de excepciones puede tener una excepcion abrobada", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    ficheroExcepciones.nuevaExcepcion(excepcion);
    gerente.aprobarExcepcion(excepcion);
    expect(ficheroExcepciones.excepciones()[0].estado()).toEqual("AprobadaEstado");
});
test("Un fichero de excepciones puede tener una excepcion rechazada", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    const excepcion = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    ficheroExcepciones.nuevaExcepcion(excepcion);
    gerente.rechazarExcepcion(excepcion);
    expect(ficheroExcepciones.excepciones()[0].estado()).toEqual("RechazadaEstado");
});
test("Un fivhero de excepciones puede tener una excepcion aprobada, otra rechazada y otra pendiente", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    const excepcion1 = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const excepcion2 = new Excepcion(new Date("2023-04-24"), "Vacaciones");
    const excepcion3 = new Excepcion(new Date("2023-04-25"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    ficheroExcepciones.nuevaExcepcion(excepcion1);
    ficheroExcepciones.nuevaExcepcion(excepcion2);
    ficheroExcepciones.nuevaExcepcion(excepcion3);
    gerente.aprobarExcepcion(excepcion1);
    gerente.rechazarExcepcion(excepcion2);
    expect(ficheroExcepciones.excepciones()[0].estado()).toEqual("AprobadaEstado");
    expect(ficheroExcepciones.excepciones()[1].estado()).toEqual("RechazadaEstado");
    expect(ficheroExcepciones.excepciones()[2].estado()).toEqual("PendienteEstado");
});
test("Un fichero de excepciones puede tener una excepcion aprobada, otra rechazada y otra pendiente y se pueden listar las aprobadas", () => {
    const ficheroExcepciones = new FichaPersonalDeExcepciones();
    const excepcion1 = new Excepcion(new Date("2023-04-23"), "Enfermedad");
    const excepcion2 = new Excepcion(new Date("2023-04-24"), "Vacaciones");
    const excepcion3 = new Excepcion(new Date("2023-04-25"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    ficheroExcepciones.nuevaExcepcion(excepcion1);
    ficheroExcepciones.nuevaExcepcion(excepcion2);
    ficheroExcepciones.nuevaExcepcion(excepcion3);
    gerente.aprobarExcepcion(excepcion1);
    gerente.rechazarExcepcion(excepcion2);
    expect(ficheroExcepciones.excepcionesAprobadas().length).toEqual(1);
    expect(ficheroExcepciones.excepcionesAprobadas()[0].estado()).toEqual("AprobadaEstado");
});
test("Una ExcepcionDeAusencia no permite que se trabaje ese día", () => {
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-23"), "Enfermedad");
    expect(excepcion.daPermisoParaTrabajarEn(new Date("2023-04-23"))).toBe(false);
});
test("Una ExcepcionDeAusencia permite que se trabaje otro día", () => {
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-23"), "Enfermedad");
    expect(excepcion.daPermisoParaTrabajarEn(new Date("2023-04-24"))).toBe(true);
});
test("Una ExepcionDeDisponibilidad permite que se trabaje ese día", () => {
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-23"), "Alfinal este día puedo");
    expect(excepcion.daPermisoParaTrabajarEn(new Date("2023-04-23"))).toBe(true);
});
test("Cuando se le pregunta a la ExcepcionDeDisponibilidad si permite que se trabaje un día diferente al que ella habilita, responde que no", () => {
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-23"), "Alfinal este día puedo");
    expect(excepcion.daPermisoParaTrabajarEn(new Date("2023-04-24"))).toBe(false);
});
test("Si el usuario tiene disponibilidad fija Martes y Jueves, pero justo el martes 2023-04-25 no trabaja",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes", "Jueves"]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-25"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(false);
})
test("Si el usuario tiene disponibilidad fija Martes y Jueves, pero justo el miercoles 2023-04-26 trabaja",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Martes", "Jueves"]);
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-26"), "Alfinal este día puedo");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(true);
})
test("El usuario tiene disponibilidad en la semana, pidio una exepcion para el martes 2023-04-25 y se la rechazaron",()=>{
    const disponibilidad = new DisponibilidadSemanal();
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-25"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(true);
})
test("El usuario tiene disponibilidad en la semana, pidio una exepcion para el martes 2023-04-25 y todavía no se la aprobaron",()=>{
    const disponibilidad = new DisponibilidadSemanal();
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-25"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(true);
})
test("El usuario tiene disponibilidad los fines de semana, pidio trabajar el 2023-04-25. La excepcion fue aprobada",()=>{
    const disponibilidad = new DisponibilidadFinDeSemana();
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-25"), "Alfinal este día puedo!");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(true);
})
test("El usuario tiene disponibilidad los fines de semana, pidio trabajar el 2023-04-25 y se la rechazaron",()=>{
    const disponibilidad = new DisponibilidadFinDeSemana();
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-25"), "Alfinal este día puedo!");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(false);
})
test("El usuario tiene disponibilidad los fines de semana, pidio trabajar el 2023-04-25 y todavía no se la aprobaron",()=>{
    const disponibilidad = new DisponibilidadFinDeSemana();
    const empleado = new Empleado("Juan", [disponibilidad]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-25"), "Alfinal este día puedo");
    empleado.levantarExcepcion(excepcion);
    expect(empleado.estaDisponible(new Date("2023-04-25"))).toBe(false);
})

test("Si un miembro de un equipo levanta una exepcion para el jueves 2023-04-27 y se la aprueban, el equipo no esta disponible ese día aunque todos tengan disponibilidad los jueves",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Jueves"]);
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad, disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-27"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.aprobarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(false);
})

test("Si un miembro de un equipo levanta una exepcion para el jueves 2023-04-27 y se rechaza, el equipo esta disponible ese día",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Jueves"]);
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad, disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-27"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    const gerente = new Gerente("Pablo");
    gerente.rechazarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(true);
})
test("Si un miembro de un equipo levanta una exepcion para el jueves 2023-04-27 y esta pendiente, el equipo esta disponible ese día",()=>{
    const disponibilidad = new DisponibilidadDiaPuntual(["Jueves"]);
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad, disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-27"), "Enfermedad");
    empleado.levantarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(true);
})
test("Si un miembro de un equipo nunca puede los jueves, entonces el equipo no esta disponible, pero si ese empleado declara que esta disponible un jueves en particular, el equipo pasa a tener disponibilidad",()=>{
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-27"), "Alfinal ese día puedo!");
    const gerente = new Gerente("Pablo");
    empleado1.levantarExcepcion(excepcion);
    gerente.aprobarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(true);
})
test("Si un miembro de un equipo nunca puede los jueves, entonces el equipo no esta disponible, pero si aunque ese empleado declara que esta disponible un jueves en particular, si la excepcion se rechazaa, el equipo sigue sin estar disponible",()=>{
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-27"), "Alfinal ese día puedo!");
    empleado.levantarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(false);
})
test("Si un miembro de un equipo nunca puede los jueves, entonces el equipo no esta disponible, pero si aunque ese empleado declara que esta disponible un jueves en particular, si la excepcion se rechazaa, el equipo sigue sin estar disponible",()=>{
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-27"), "Alfinal ese día puedo!");
    const gerente = new Gerente("Pablo");
    empleado.levantarExcepcion(excepcion);
    gerente.rechazarExcepcion(excepcion);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(false);
})
test("Si un miembro de un equipo pide primero excepcion para trabajar el jueves 2023-04-27 y luego pide excepcion para no trabajar ese mismo día, el equipo no esta disponible ese día",()=>{
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExepcionDeDisponibilidad(new Date("2023-04-27"), "Alfinal ese día puedo!");
    const excepcion2 = new ExcepcionDeAusencia(new Date("2023-04-27"), "Enfermedad");
    const gerente = new Gerente("Pablo");
    empleado.levantarExcepcion(excepcion);
    empleado.levantarExcepcion(excepcion2);
    gerente.aprobarExcepcion(excepcion);
    gerente.aprobarExcepcion(excepcion2);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(false);
})
test("Si un miembro de un equipo pide primero excepcion para no trabajar el jueves 2023-04-27 y luego pide excepcion para si trabajar ese mismo día, el equipo esta disponible ese día",()=>{
    const disponibilidad1 = new DisponibilidadFinDeSemana();
    const disponibilidad2 = new DisponibilidadSemanal();
    const disponibilidad3 = new DisponibilidadDiaDelMes([27]);
    const empleado = new Empleado("Juan", [disponibilidad3, disponibilidad1]);
    const empleado1 = new Empleado("Carla", [disponibilidad1]);
    const empleado2 = new Empleado("Pedro", [disponibilidad2]);
    const equipo = new Equipo([empleado, empleado1, empleado2]);
    const excepcion = new ExcepcionDeAusencia(new Date("2023-04-27"), "Enfermedad");
    const excepcion2 = new ExepcionDeDisponibilidad(new Date("2023-04-27"), "Alfinal ese día no puedo!");
    const gerente = new Gerente("Pablo");
    empleado1.levantarExcepcion(excepcion);
    empleado1.levantarExcepcion(excepcion2);
    gerente.aprobarExcepcion(excepcion);
    gerente.aprobarExcepcion(excepcion2);
    expect(equipo.estaDisponible(new Date("2023-04-27"))).toBe(true);
})