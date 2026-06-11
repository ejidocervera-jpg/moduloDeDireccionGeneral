document.addEventListener('DOMContentLoaded', () => {
   const rutaJSON = './json/cajachica.json';
    const storal = 'secretariaCajaChica';
    const tabla = document.getElementById('tablaCajaChica');
    const form = document.getElementById('formCajaChica');
  
    let movimientos = [];

    function cargarCaja() {
          const datosGuardados = localStorage.getItem(storal);
        if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            saldo = data.saldo;
            movimientos = data.movimientos;
            renderizarCaja();
            return;


            const xhr = new XMLHttpRequest();
            xhr.open('GET', rutaJSON, true);
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    saldo = data.saldo;
                    movimientos = data.movimientos;
                    localStorage.setItem(storal, JSON.stringify(dato));
                    renderizarCaja();
                } else {
                    console.error('No se pudo cargar cajachica.json');
                
            }
        };
        xhr.send();
        }

        
});
    
    
      
    

  

    