document.addEventListener('DOMContentLoaded', () => {
    const rutaJSON = './json/cajachica.json';
    const storal = 'secretariaCajaChica';
    const tabla = document.getElementById('tablaCajaChica');
    const form = document.getElementById('formCajaChica');
  
    let movimientos = [];
    let saldo = 0; // Se agregó la variable saldo para evitar errores

    function cargarCaja() {
        const datosGuardados = localStorage.getItem(storal);
        
        if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            saldo = data.saldo;
            movimientos = data.movimientos;
            renderizarCaja();
        } else {
            // Se ejecuta si no hay datos en localStorage
            const xhr = new XMLHttpRequest();
            xhr.open('GET', rutaJSON, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        saldo = data.saldo;
                        movimientos = data.movimientos;
                        
                        // Guardamos en localStorage para la próxima vez
                        localStorage.setItem(storal, JSON.stringify({ saldo, movimientos }));
                        renderizarCaja();
                    } else {
                        console.error('No se pudo cargar cajachica.json');
                    }
                }    
            };
            xhr.send();
        }
    }
    
    // Llamamos a la función para que inicie al cargar la página
    cargarCaja();
});
        

    
    
      
    

  

    