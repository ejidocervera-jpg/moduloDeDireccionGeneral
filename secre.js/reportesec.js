document.addEventListener('DOMContentLoaded', () => {
    const rutaJSON = './json/reportesec.json';
    const storal = 'secretariaReportes';
    const lista = document.getElementById('listaReportesRecientes');
    const form = document.getElementById('formReporteSec');
  
    let reportes = [];

    function cargarReportes() {
        const datosGuardados = localStorage.getItem(storal);
        if (datosGuardados) {
            renderizarReportes(JSON.parse(datosGuardados));
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', rutaJSON, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    reportes = data.reportesRecientes;
                    localStorage.setItem(storal, JSON.stringify(data));
                    renderizarReportes(data);
                } else {
                    console.error('No se pudo cargar reportesec.json');
                }
            }
        };
        xhr.send();
    }
});
    