// CONFIGURACION DE IMAGEN Y NOMBRE DE PERFIL DEL USUARIO
const user= JSON.parse(localStorage.getItem('login_success'))
const perfil = document.querySelector(".foto_autor");

if((user.name).toLowerCase()=="daniel betancur giraldo"){
    perfil.src='Img/DanielBeta.jpeg'
}else if((user.name).toLowerCase()=="sofia quimbay cadena"){
    perfil.src='Img/SofiaQuimbay.jpeg'
}else if((user.name).toLowerCase()=="laura valentina Leon castro"){
    perfil.src='Img/ValeLeon.jpeg'
}else if((user.name).toLowerCase()=="maria juliana ortiz patiño"){
    perfil.src='Img/JuliOrtiz.jpeg'
}else{
    perfil.src='Img/perfilAlternativo.png'
}

const configuracion= JSON.parse(localStorage.getItem('configuracion'))
const configuracionUsuario= configuracion.find(config =>  user.email ===config.email )
const usuario = document.getElementById("usuario");
if(configuracionUsuario.reset==0){
    usuario.textContent=configuracionUsuario.usuario;
}else{
    usuario.textContent=configuracionUsuario.usuario1;
}

const inputPrecio = document.querySelector(".input_ValorActual");
const inputIncremento = document.querySelector(".input_Incremento");

inputPrecio.addEventListener("input", function() {
    // Obtén el valor actual del campo de entrada
    const valor = inputPrecio.value;
    // Elimina cualquier caracter que no sea un número usando una expresión regular
    const valorNumerico = valor.replace(/[^0-9]/g, '');
    // Actualiza el valor del campo de entrada con solo números
    inputPrecio.value = valorNumerico;
  });

  inputIncremento.addEventListener("input", function() {
    // Obtén el valor actual del campo de entrada
    const valor = inputIncremento.value;
    // Elimina cualquier caracter que no sea un número usando una expresión regular
    const valorNumerico = valor.replace(/[^0-9]/g, '');
    // Actualiza el valor del campo de entrada con solo números
    inputIncremento.value = valorNumerico;
  });

  //FALTA IMPLEMENTAR QUE LOS INPUTS NO ESTEN VACIOS
