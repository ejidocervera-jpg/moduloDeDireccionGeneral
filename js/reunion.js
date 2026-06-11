
const clave = 'sistemaReunion';

// Objeto global estructurado exactamente como tu archivo JSON
let BD = {
    usuarios: [],
    documentos: [],
    reuniones: [],
    solicitudesReunion: []
};

function inicializarBaseDeDatos() {
    // Si ya existen datos editados por el usuario en LocalStorage, los usamos
    if (localStorage.getItem(clave)) {
        BD = JSON.parse(localStorage.getItem(clave));
        ejecutarCargasVisuales();
    } else {
        // Si es la primera vez, se descargan del servidor con XMLHttpRequest puro
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './json/reunion.json', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    BD = JSON.parse(xhr.responseText);
                    guardarEnLocalStorage();
                    ejecutarCargasVisuales();
                } catch (error) {
                    console.error("Error al procesar el archivo JSON:", error);
                }
            }
        };
        xhr.send();
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem(clave, JSON.stringify(BD));
}

