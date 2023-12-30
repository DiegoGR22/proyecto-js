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

// let tareasCargadasDesdeAPI = false; 
function cargarTareasDesdeAPI() {
    
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    if (tareas.length === 0) {
        fetch(apiUrl)
            .then((response) => response.json())
            .then(response => {
                // Solo los primeros 10 elementos de la API
                tareas = response.slice(0, 10).map(item => new Tarea(item.title, item.completed));
                actualizarTareas();
                // tareasCargadasDesdeAPI = true;
                guardarTareasEnStorage();
            })
            .catch(error => {
                console.error('Error al cargar las tareas desde la API:', error);
            });
    }
}

cargarTareasDesdeAPI();

// window.addEventListener('load', cargarTareasDesdeAPI);

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click',agregarTarea);

async function agregarTarea() {
    // const tareaNombre = prompt('Ingrese una nueva tarea:');
    const {value: tareaNombre} = await Swal.fire({
        title: "Ingrese una nueva tarea",
        input: "text",
        inputLabel: "Tarea nueva",
        // inputValue,
        // showCancelButton: true,
        inputValidator: (value) => {
            if (!value){
                return "Debes escribir una tarea";
            }
        }
    });

    const nuevaTarea = new Tarea(tareaNombre);
    tareas.push(nuevaTarea);

    actualizarTareas();

    document.getElementById('instrucciones').innerHTML = 'Hacer click para completar';

    guardarTareasEnStorage();

    Swal.fire('Tarea agregada', `La tarea "${tareaNombre}" ha sido agregada correctamente.`, 'success');
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
        Swal.fire('Inténtelo de nuevo', `Número de tarea no válido.`, 'warning');
        // alert('Número de tarea no válido. Inténtelo de nuevo.');
    } else {
        const tareaEliminada = tareas.splice(indice - 1, 1);
        Swal.fire('Tarea eliminada', `La tarea #${indice} ha sido eliminada correctamente.`, 'error');
    }

    actualizarTareas();
    
    if (tareas.length <= 0) {
        document.getElementById('instrucciones').innerHTML = '';
    }

    guardarTareasEnStorage();

    // Swal.fire('Tarea eliminada', `La tarea #${indice} ha sido eliminada correctamente.`, 'error');
}


const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',salirTareas);

function salirTareas(){
    // const salir = confirm("¿Seguro que desea salir?");
    // if (salir){
    //     alert("Ha salido del programa");
    //     // process.exit(0);
    // }

    Swal.fire({
        title: '¿Seguro que desea salir?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Ha salido del programa', '', 'success');
            // window.close();
            localStorage.removeItem('tareas');      // Se borra del localStorage
            // actualizarTareas();
            setInterval(() => {
                window.location.href = '../pages/salir.html';
            }, 2000);
        }
    });
}

function guardarTareasEnStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}