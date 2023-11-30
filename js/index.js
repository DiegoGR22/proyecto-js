class Tarea{
    constructor(nombre, completada = false){
        this.nombre = nombre;
        this.completada = completada;
    }
}

const tareas = [];

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click',agregarTarea);

function agregarTarea() {
    const tareaNombre = prompt('Ingrese una nueva tarea:');
    const nuevaTarea = new Tarea(tareaNombre);
    tareas.push(nuevaTarea);

    actualizarTareas();

    document.getElementById('instrucciones').innerHTML = 'Hacer click para completar';
}

function actualizarTareas() {
    const listaTareas = document.getElementById('tareas-lista');
    listaTareas.innerHTML = '';

    tareas.forEach((tarea, i) => {
        const estado = tarea.completada ? 'Completada' : 'Pendiente';
        const listItem = document.createElement('li');
        listItem.textContent = `${i + 1}. ${tarea.nombre} (${estado})`;

        listItem.onclick = () => cambiarEstadoTarea(i);
        listaTareas.appendChild(listItem);
    });
}

function cambiarEstadoTarea(i) {
    document.body.classList.toggle("pendiente");
    if(document.body.classList.contains("pendiente")){
        sessionStorage.setItem("estado", "pendiente");
    } else {
        sessionStorage.setItem("estado", "completada");
    }

    tareas[i].completada = !tareas[i].completada;
    actualizarTareas();
}

const btnEliminar = document.getElementById('btnEliminar');
btnEliminar.addEventListener('click',eliminarTarea);

function eliminarTarea() {
    const indice = parseInt(prompt('Ingrese el número de la tarea que desea eliminar:'));
    if (isNaN(indice) || indice < 1 || indice > tareas.length) {
        console.log('Número de tarea no válido. Inténtelo de nuevo.');
    } else {
        const tareaEliminada = tareas.splice(indice - 1, 1);
    }

    actualizarTareas();
    
    if (tareas.length <= 0) {
        document.getElementById('instrucciones').innerHTML = '';
    }
}


const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',salirTareas);

function salirTareas(){
    const salir = confirm("¿Seguro que desea salir?");
    if (salir){
        alert("Ha salido del programa");
        process.exit(0);
    }
}
