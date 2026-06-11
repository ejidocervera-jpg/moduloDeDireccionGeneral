

// Variable global que almacenará los datos cargados del JSON
let jsonBD = {
    solicitudesSupervision: [],
    procesosSupervision: [],
    recomendacionesSupervision: []
};

// Función para cargar los datos utilizando XMLHttpRequest
function cargarDatosSupervision() {
    const xhr = new XMLHttpRequest();
    
    // Configuramos la petición GET asíncrona hacia tu archivo JSON
    xhr.open('GET', './json/supervision.json', true);
    
    // Definimos el tipo de respuesta esperada
    xhr.responseType = 'json';
    
    // Controlamos el evento cuando la petición finaliza con éxito
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Si la respuesta ya es un objeto (gracias a responseType = 'json') lo asignamos, 
            // de lo contrario, por seguridad le hacemos un JSON.parse
            jsonBD = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : xhr.response;
            
            // Renderizamos los componentes del panel con los datos obtenidos
            generarPanelSupervision();
        } else {
            console.error(`Error al cargar el archivo JSON. Código de estado: ${xhr.status}`);
        }
    };
    
    // Controlamos posibles errores de red durante la petición
    xhr.onerror = function() {
        console.error("Hubo un error de red al intentar realizar la petición con XMLHttpRequest.");
    };
    
    // Enviamos la petición
    xhr.send();
}



