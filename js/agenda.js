
document.addEventListener('DOMContentLoaded', function() {
    // Declaración del contenedor maestro para los datos del sistema
    let datosAgenda = null;

    // 1. CARGA DE DATOS ASÍNCRONA CON XMLHttpRequest
    function inicializarDatos() {
        const datosLocales = localStorage.getItem('datosSistemaAgenda');

        if (datosLocales) {
            // Si ya existen datos modificados por el usuario, los cargamos directamente
            datosAgenda = JSON.parse(datosLocales);
            ejecutarModulos();
        } else {
            // Si es la primera vez, realizamos la petición clásica al archivo JSON
            const xhr = new XMLHttpRequest();
            xhr.open('GET', './json/agenda.json', true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            datosAgenda = JSON.parse(xhr.responseText);
                            guardarEnStorage();
                            ejecutarModulos();
                        } catch (error) {
                            console.error("Error al procesar el archivo agenda.json:", error);
                        }
                    } else {
                        console.error("No se pudo conectar con la base de datos de la agenda.");
                    }
                }
            };
            xhr.send();
        }
    }

    function guardarEnStorage() {
        localStorage.setItem('datosSistemaAgenda', JSON.stringify(datosAgenda));
    }

   
});