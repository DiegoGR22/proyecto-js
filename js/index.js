const tareas = [];

function agregarTarea() {
    const tarea = prompt('Ingrese una nueva tarea:');
    tareas.push({ nombre: tarea, completada: false });
    console.log(`Tarea "${tarea}" agregada.`);
}

function listarTareas() {
    console.log('Lista de tareas:');
    for (let i = 0; i < tareas.length; i++) {
        const estado = tareas[i].completada ? 'Completada' : 'Pendiente';
        console.log(`${i + 1}. ${tareas[i].nombre} (${estado})`);
    }
}

function cambiarEstadoTarea() {
    const indice = parseInt(prompt('Ingrese el número de la tarea que desea completar:'));
    if (isNaN(indice) || indice < 1 || indice > tareas.length) {
        console.log('Número de tarea no válido. Inténtelo de nuevo.');
    } else {
        tareas[indice - 1].completada = true;
        console.log(`Tarea "${tareas[indice - 1].nombre}" marcada como completada.`);
    }
}

function eliminarTarea() {
    const indice = parseInt(prompt('Ingrese el número de la tarea que desea eliminar:'));
    if (isNaN(indice) || indice < 1 || indice > tareas.length) {
        console.log('Número de tarea no válido. Inténtelo de nuevo.');
    } else {
        const tareaEliminada = tareas.splice(indice - 1, 1);
        console.log(`Tarea "${tareaEliminada[0].nombre}" eliminada.`);
    }
}

function salirTareas(){
    salir = prompt("¿Seguro que desea salir? (SI / NO)").toLowerCase();
    if (salir === "si"){
        alert("Ha salido del programa");
        process.exit(0);
    } else {
        console.log("Elija de nuevo.");
    }
}

while (true) {
    const opcion = prompt('Elija una opción:\n1. Agregar tarea\n2. Listar tareas\n3. Completar tarea\n4. Eliminar tarea\n5. Salir');

    switch (opcion) {
        case '1':
            agregarTarea();
            break;
        case '2':
            listarTareas();
            break;
        case '3':
            cambiarEstadoTarea();
            break;
        case '4':
            eliminarTarea();
            break;
        case '5':
            salirTareas();
        default:
            console.log('Opción no válida. Por favor, seleccione una opción válida.');
    }
}

