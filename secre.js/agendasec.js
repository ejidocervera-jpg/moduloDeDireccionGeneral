document.addEventListener('DOMContentLoaded', () => {
    const rutaJSON = './json/agendasec.json';
    const storal = 'secretariaAgenda';
    const tabla = document.getElementById('tablaAgendaSec');
    const form = document.getElementById('formAgendaSec');
    let eventos = [];

    function cargarEventos() {
        const datosGuardados = localStorage.getItem(storal);
        if (datosGuardados) {
            eventos = JSON.parse(datosGuardados);
            renderizarEventos();
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', rutaJSON, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    eventos = JSON.parse(xhr.responseText).eventos;
                    localStorage.setItem(storal, JSON.stringify(eventos));
                    renderizarEventos();
                } else {
                    console.error('No se pudo cargar agendasec.json');
                }
            } // <- Faltaba cerrar este bloque if
        }; // <- Faltaba cerrar esta arrow function correctamente
        xhr.send();
    }

    // Se agrega la llamada para ejecutar la función
    cargarEventos(); 
});

  