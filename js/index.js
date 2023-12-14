class Tarea{
    constructor(nombre, completada = false){
        this.nombre = nombre;
        this.completada = completada;
    }
}

let tareas = [];

function cargarTareasDesdeStorage() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        actualizarTareas();
    }
}

cargarTareasDesdeStorage();

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click',agregarTarea);

function agregarTarea() {
    const tareaNombre = prompt('Ingrese una nueva tarea:');
    const nuevaTarea = new Tarea(tareaNombre);
    tareas.push(nuevaTarea);

    actualizarTareas();

    document.getElementById('instrucciones').innerHTML = 'Hacer click para completar';

    guardarTareasEnStorage();
}

function actualizarTareas() {
    const listaTareas = document.getElementById('tareas-lista');
    listaTareas.innerHTML = '';

    tareas.forEach((tarea, i) => {
        const estado = tarea.completada ? 'Completada' : 'Pendiente';
        const listItem = document.createElement('li');
        listItem.textContent = `${i + 1}. ${tarea.nombre} (${estado})`;

        listItem.classList.toggle("completada", tarea.completada);
        listItem.classList.toggle("pendiente", !tarea.completada);

        listItem.onclick = () => cambiarEstadoTarea(i);
        listaTareas.appendChild(listItem);
    });
}

function cambiarEstadoTarea(i) {
    tareas[i].completada = !tareas[i].completada;
    actualizarTareas();

    guardarTareasEnStorage();
}

const btnEliminar = document.getElementById('btnEliminar');
btnEliminar.addEventListener('click',eliminarTarea);

function eliminarTarea() {
    const indice = parseInt(prompt('Ingrese el número de la tarea que desea eliminar:'));
    if (isNaN(indice) || indice < 1 || indice > tareas.length) {
        alert('Número de tarea no válido. Inténtelo de nuevo.');
    } else {
        const tareaEliminada = tareas.splice(indice - 1, 1);
    }

    actualizarTareas();
    
    if (tareas.length <= 0) {
        document.getElementById('instrucciones').innerHTML = '';
    }

    guardarTareasEnStorage();
}


const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',salirTareas);

function salirTareas(){
    const salir = confirm("¿Seguro que desea salir?");
    if (salir){
        alert("Ha salido del programa");
        // process.exit(0);
    }
}

function guardarTareasEnStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}