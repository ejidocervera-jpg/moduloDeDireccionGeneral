document.addEventListener('DOMContentLoaded', () => {
    const rutaJSON = './json/iniciosec.json';
    const STORAGE_KEY = 'secretariaInicio';

    function cargarDatos() {
        const datosGuardados = localStorage.getItem(STORAGE_KEY);
        if (datosGuardados) {
            renderizarInicio(JSON.parse(datosGuardados));
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', rutaJSON, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const datos = JSON.parse(xhr.responseText);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
                    renderizarInicio(datos);
                } else {
                    console.error('No se pudo cargar iniciosec.json');
                }
            }
        };
        xhr.send();
    }

    function renderizarInicio(datos) {
        const titulo = document.querySelector('.bienvenida h1');
        const descripcion = document.querySelector('.bienvenida p');

        if (titulo) titulo.textContent = datos.bienvenida.titulo;
        if (descripcion) descripcion.textContent = datos.bienvenida.descripcion;

        // Soporta tanto si el JSON usa la propiedad 'cards' como si usa 'tarjetas'
        const listadoTarjetas = datos.tarjetas || datos.cards;

        if (listadoTarjetas) {
            listadoTarjetas.forEach(tarjeta => {
                // Traduce dinámicamente el prefijo de la clase por si el JSON viene con 'card-' de origen
                const claseEspañol = tarjeta.clase.replace('card-', 'tarjeta-');
                const elemento = document.querySelector(`.${claseEspañol}`);
                
                if (!elemento) return;
                const encabezado = elemento.querySelector('h3');
                const valor = elemento.querySelector('p');
                if (encabezado) encabezado.textContent = tarjeta.titulo;
                if (valor) valor.textContent = tarjeta.valor;
            });
        }

        // Se mantiene la estructura por si agregas este contenedor en el futuro
        const resumenGrid = document.querySelector('.resumen-cuadricula') || document.querySelector('.resumen-grid');
        if (resumenGrid) {
            resumenGrid.innerHTML = datos.resumen.map(item => `
                <div class="resumen-tarjeta">
                    <h4>${item.titulo}</h4>
                    <p>${item.texto}</p>
                </div>
            `).join('');
        }
    }

    cargarDatos();
});