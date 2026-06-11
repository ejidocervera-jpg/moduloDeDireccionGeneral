
document.addEventListener('DOMContentLoaded', () => {
    let datosSistema = null;

    // 1. CARGAR DATOS DESDE LOCALSTORAGE O CON XMLHttpRequest
    function inicializarDatos() {
        const datosLocales = localStorage.getItem('datosDocumentos');
        
        if (datosLocales) {
            // Si ya existen datos modificados en el navegador, los usamos
            datosSistema = JSON.parse(datosLocales);
            renderizarTodo();
        } else {
            // Si es la primera vez, los traemos del archivo JSON usando XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('GET', './json/documentos.json', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            datosSistema = JSON.parse(xhr.responseText);
                            guardarEnStorage();
                            renderizarTodo();
                        } catch (error) {
                            console.error("Error al procesar el JSON de documentos:", error);
                        }
                    } else {
                        console.error("No se pudo conectar con el archivo documentos.json");
                        alert("Error al conectar con el servidor documental ficticio.");
                    }
                }
            };

            xhr.send();
        }
    }

    function guardarEnStorage() {
        localStorage.setItem('datosDocumentos', JSON.stringify(datosSistema));
    }

    // 2. RENDERIZADORES DE LAS TABLAS DEL PANAL
    function renderizarTodo() {
        renderizarPendientes(datosSistema.pendientes);
        renderizarAprobados(datosSistema.aprobados);
        renderizarContratosProfesores();
        renderizarContratosPersonal();
        renderizarContratosEmpresas();
        renderizarHistorial();
    }

    function renderizarPendientes(lista) {
        const tbody = document.getElementById('tablaPendientes');
        tbody.innerHTML = '';
        
        if (lista.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay documentos pendientes</td></tr>`;
            return false;
        }

        lista.forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${doc.codigo}</strong></td>
                <td>${doc.asunto}</td>
                <td>${doc.remitente}</td>
                <td>${doc.fecha}</td>
                <td><span class="estado-pendiente">${doc.estado}</span></td>
                <td>
                    <button class="btn-ver" data-id="${doc.codigo}">Ver</button>
                    <button class="btn-aprobar" data-id="${doc.codigo}">Aprobar</button>
                    <button class="btn-rechazar" data-id="${doc.codigo}">Rechazar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderizarAprobados(lista) {
        const tbody = document.getElementById('tablaAprobados');
        tbody.innerHTML = '';
        lista.forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${doc.codigo}</strong></td>
                <td>${doc.asunto}</td>
                <td>${doc.fecha}</td>
                <td><span class="estado-aprobado">${doc.estado}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderizarContratosProfesores() {
        const tbody = document.getElementById('tablaProfesores');
        tbody.innerHTML = datosSistema.profesores.map(p => `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.departamento}</td>
                <td>${p.inicio}</td>
                <td>${p.vencimiento}</td>
                <td><span class="estado-activo">${p.estado}</span></td>
            </tr>
        `).join('');
    }

    function renderizarContratosPersonal() {
        const tbody = document.getElementById('tablaPersonal');
        tbody.innerHTML = datosSistema.personal.map(p => `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.cargo}</td>
                <td>${p.inicio}</td>
                <td>${p.vencimiento}</td>
                <td><span class="estado-activo">${p.estado}</span></td>
            </tr>
        `).join('');
    }

    function renderizarContratosEmpresas() {
        const tbody = document.getElementById('tablaEmpresas');
        tbody.innerHTML = datosSistema.empresas.map(e => `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.servicio}</td>
                <td>${e.inicio}</td>
                <td>${e.vencimiento}</td>
                <td><span class="estado-activo">${e.estado}</span></td>
            </tr>
        `).join('');
    }

    function renderizarHistorial() {
        const lista = document.getElementById('listaHistorial');
        lista.innerHTML = datosSistema.historial.map(h => `<li>${h}</li>`).join('');
    }

    // 3. CAPTURADOR DE ACCIONES (APROBAR / RECHAZAR / VER)
    const tablaPendientes = document.getElementById('tablaPendientes');
    if (tablaPendientes) {
        tablaPendientes.addEventListener('click', (e) => {
            const codigo = e.target.getAttribute('data-id');
            if (!codigo) return;

            if (e.target.classList.contains('btn-aprobar')) {
                procesarDocumento(codigo, 'Aprobado');
            } else if (e.target.classList.contains('btn-rechazar')) {
                procesarDocumento(codigo, 'Rechazado');
            } else if (e.target.classList.contains('btn-ver')) {
                const doc = datosSistema.pendientes.find(d => d.codigo === codigo);
                alert(`Visualizando Documento:\nCódigo: ${doc.codigo}\nAsunto: ${doc.asunto}\nRemitente: ${doc.remitente}`);
            }
        });
    }

    function procesarDocumento(codigo, nuevoEstado) {
        const indice = datosSistema.pendientes.findIndex(d => d.codigo === codigo);
        if (indice === -1) return;

        // Sacar el documento de la lista de pendientes
        const [documento] = datosSistema.pendientes.splice(indice, 1);
        documento.estado = nuevoEstado;

        // Si fue aprobado, agregarlo al inicio de la lista de aprobados
        if (nuevoEstado === 'Aprobado') {
            datosSistema.aprobados.unshift(documento);
        }

        // Agregar al historial de actividades de manera interactiva
        const fechaActual = new Date().toLocaleDateString('es-ES');
        datosSistema.historial.unshift(`${codigo} ${nuevoEstado.toLowerCase()} - ${fechaActual}`);

        // Guardar la persistencia local y refrescar la pantalla
        guardarEnStorage();
        renderizarTodo();
    }

    // 4. MOTOR DE BÚSQUEDA INTERACTIVO EN TIEMPO REAL
    const inputBuscar = document.getElementById('inputBuscar');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', (e) => {
            const busqueda = e.target.value.toLowerCase().trim();
            
            // Filtramos el array de pendientes basándonos en lo que escribe el usuario
            const pendientesFiltrados = datosSistema.pendientes.filter(doc => 
                doc.asunto.toLowerCase().includes(busqueda) || 
                doc.remitente.toLowerCase().includes(busqueda) || 
                doc.codigo.toLowerCase().includes(busqueda)
            );
            
            // Renderizamos únicamente lo filtrado en la tabla de pendientes
            renderizarPendientes(pendientesFiltrados);
        });
    }

    // Arrancar la carga del programa
    inicializarDatos();
});