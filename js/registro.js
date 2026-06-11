// VALIDANDO EL FORMULARIO DE REGISTRO DE USUARIOS

let myForm = document.getElementById(`myForm`)
myForm.addEventListener('submit', validar);
let patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/;
let patronApell = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+\s[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/ 
let patronUsuario = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/;
let patronPass = /[a-zA-Z0-9].+/;

function validar(e){
    e.preventDefault();
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let usuario = document.getElementById('usuario');
    let pass = document.getElementById('contraseña');
    let rpas = document.getElementById('confirmarContraseña');
    
    if(nombre.value.trim() === "" || nombre.value.length == 0){
        alert("El campo nombre no puede estar vacio");
        nombre.focus();
        return false;
    }else if(!patronNombre.test(nombre.value)){
        alert("El nombre no es valido, utiliza un nombre valido")
        nombre.focus();
        return false;
    }
    
    if(apellidos.value.trim() === "" || apellidos.value.length == 0){
    alert("El campo apellidos no puede estar vacio;por favor introduzca sus apellidos");
    apellidos.focus();
    return false;
  }else if(!patronApell.test(apellidos.value)){
    alert("Tus apellidos no son validos, por favor, introduzca apellidos válidos")
    apellidos.focus();
    return false;
  }
   if(usuario.value.trim() === "" || usuario.value.length == 0){
    alert("El campo usuario no puede estar vacio; por favor introduzca un nombre de usuario");
    usuario.focus();
    return false;
  }else if(!patronUsuario.test(usuario.value)){
    alert("El nombre de usuario no es valido, por favor, introduzca tu nombre sin espacios ni caracteres especiales")
    usuario.focus();
    return false;
  }
 
   if(contraseña.value.trim() === "" || contraseña.value.length ==0){
    alert("introduzaca una contraseña");
    contraseña.focus();
    return false;
  }else if(!patronPass.test(contraseña.value)){
    alert("contraseña invalida, desbes escribir contraseñas validas")
    contraseña.focus();
    return false;
  }

  if(confirmarContraseña.value.trim() === "" || confirmarContraseña.value.length ==0){
    alert("ese campo es obligatorio");
    confirmarContraseña.focus();
    return false;
  }else if(!patronPass.test(confirmarContraseña.value)){
    alert("error,por favor, introduzaca una contraseña vlida");
    confirmarContraseña.focus();
    return false;
  }else if(confirmarContraseña.value !== contraseña.value){
    alert("contraseña incorecta, ambas contraseñas deben ser iguales")
    confirmarContraseña.focus();
    return false;
  }

  window.location.href = "login.html";
}