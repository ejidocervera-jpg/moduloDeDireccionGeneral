document.addEventListener("DOMContentLoaded", () => {
    const rutaJSON = './json/documentosec.json';
    const storal = 'secretariaDocumentos';
    const tabla = document.getElementById('tablaDocumentosPendientes');
    const inputBuscar = document.getElementById('inputBuscarDoc');
    const form = document.getElementById('formRegistrarDocumento');
    let documentos = [];

    function cargarDocumentos() {
        const datosGuardados = localStorage.getItem(storal);
        if (datosGuardados) {
            documentos = JSON.parse(datosGuardados);
            renderizarDocumentos(documentos);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', rutaJSON, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    documentos = JSON.parse(xhr.responseText).pendientes;
                    localStorage.setItem(storal, JSON.stringify(documentos));
                    renderizarDocumentos(documentos);
                } else {
                    console.error('No se pudo cargar documentosec.json');
                }
            }
        };
        xhr.send();
    }
});
    function renderizarDocumentos(lista) {
        if (!tabla) return;
        tabla.innerHTML = '';
        if (!lista.length) {
            tabla.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay documentos para mostrar</td></tr>';
            return;
        }

        lista.forEach(doc => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><strong>${doc.codigo}</strong></td>
                <td>${doc.asunto}</td>
                <td>${doc.remitente}</td>
                <td>${doc.fecha}</td>
                <td>${doc.estado}</td>
            `;
            tabla.appendChild(fila);
        });
    }

    function buscarDocumentos() {
        const termino = inputBuscar?.value.toLowerCase().trim() || '';
        const filtrados = documentos.filter(item =>
            item.codigo.toLowerCase().includes(termino) ||
            item.asunto.toLowerCase().includes(termino) ||
            item.remitente.toLowerCase().includes(termino)
        );
        renderizarDocumentos(filtrados);
    }

    function registrarDocumento(event) {
        event.preventDefault();

        const asunto = document.getElementById('asuntoDoc')?.value.trim();
        const remitente = document.getElementById('remitenteDoc')?.value.trim();
        const fecha = document.getElementById('fechaDoc')?.value;
        const tipo = document.getElementById('tipoDoc')?.value;

        if (!asunto || !remitente || !fecha || !tipo) {
            alert('Completa todos los campos antes de registrar el documento.');
            return;
        }

        
