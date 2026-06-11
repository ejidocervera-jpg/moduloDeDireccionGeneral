document.addEventListener('DOMContentLoaded', () => {
    // Objeto maestro que reemplaza las variables estáticas del principio
    let dbReportes = null;

    // 1. CONTROL DE FLUJO Y SOLICITUD DE DATOS (JSON + LocalStorage)
    function iniciarCargaDB() {
        const localDato = localStorage.getItem('datosSistemaReportes');
        
        if (localDato) {
            dbReportes = JSON.parse(localDato);
            ejecutarFlujoModulo();
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', './json/reportes.json', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            dbReportes = JSON.parse(xhr.responseText);
                            guardarDatosEnStorage();
                            ejecutarFlujoModulo();
                        } catch (e) {
                            console.error("Error al transformar el archivo reportes.json:", e);
                        }
                    } else {
                        console.error("No se pudo obtener la base de datos de reportes.");
                    }
                }
            };
            xhr.send();
        }
    }

    function guardarDatosEnStorage() {
        localStorage.setItem('datosSistemaReportes', JSON.stringify(dbReportes));
    }
});