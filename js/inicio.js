
document.addEventListener('DOMContentLoaded', () => {
    let datosInicio = null;
    let datosDocumentos = null;

    // 1. CARGAR DATOS CRUZADOS (JSON + LOCALSTORAGE)
    function cargarComponentes() {
        // Traer datos de documentos desde LocalStorage para sincronizar contadores e historial
        const localDoc = localStorage.getItem('datosDocumentos');
        if (localDoc) {
            datosDocumentos = JSON.parse(localDoc);
        }

        // Cargar datos de la agenda y supervisión mediante XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './json/inicio.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        datosInicio = JSON.parse(xhr.responseText);
                        // Llamamos a la función 
                        renderizarInicio();
                    } catch (e) {
                        console.error("Error al procesar inicio.json:", e);
                    }
                } else {
                    console.error("No se pudo cargar inicio.json");
                }
            }
        };
        xhr.send();
    }

    // 2. RENDERIZADO DINÁMICO DEL CUADRO DE INICIO
    function renderizarInicio() {
        // --- SECCIÓN A: SINCRONIZACIÓN DE DOCUMENTOS (LocalStorage) ---
        if (datosDocumentos) {
            const totalPendientes = datosDocumentos.pendientes.length;
            
            // Actualizar contador numérico de la alerta superior
            const alertaContador = document.getElementById('alertaContador');
            if (alertaContador) alertaContador.textContent = totalPendientes;

            // Ocultar el bloque de alerta por completo si ya no hay pendientes
            const bloqueAlerta = document.getElementById('bloqueAlerta');
            if (bloqueAlerta) {
                bloqueAlerta.style.display = totalPendientes === 0 ? 'none' : 'block';
            }

            // Actualizar la tarjeta estadística (Card Documentos)
            const cardDoc = document.getElementById('cardDocPendientes');
            if (cardDoc) cardDoc.textContent = `${totalPendientes} Pendientes`;

            // Cargar las actividades recientes reales extraídas del historial de documentos
            const listaAct = document.getElementById('listaActividades');
            if (listaAct) {
                const ultimasActividades = datosDocumentos.historial.slice(0, 4);
                if (ultimasActividades.length === 0) {
                    listaAct.innerHTML = `<li>✓ No hay movimientos recientes</li>`;
                } else {
                    listaAct.innerHTML = ultimasActividades.map(act => `<li>✓ ${act}</li>`).join('');
                }
            }
        }

        // --- SECCIÓN B: RENDERIZADO DE AGENDA Y SUPERVISIÓN (JSON) ---
        // Insertar Agenda del día
        const listaAgenda = document.getElementById('listaAgenda');
        if (listaAgenda && datosInicio.agenda) {
            listaAgenda.innerHTML = datosInicio.agenda.map(item => `
                <li><strong>${item.hora}</strong> - ${item.evento}</li>
            `).join('');
        }

        // Insertar Tabla de Supervisión Institucional
        const tbodySupervision = document.getElementById('tablaSupervision');
        if (tbodySupervision && datosInicio.supervision) {
            tbodySupervision.innerHTML = datosInicio.supervision.map(item => `
                <tr>
                    <td>${item.departamento}</td>
                    <td><span class="estado-activo">${item.estado}</span></td>
                    <td>${item.responsable}</td>
                </tr>
            `).join('');
        }
    }

    // Inicializar el cuadro de mandos
    cargarComponentes();
});