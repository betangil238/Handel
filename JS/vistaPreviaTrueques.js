const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}

const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    console.log("Entro")
    mostrarAlerta();
    localStorage.removeItem('login_success')
    setTimeout(() => {
        window.location.href='login.html';
    }, 2500);
})

function mostrarAlerta() {
    Swal.fire({
        title: 'Muchas gracias',
        text: 'Hasta pronto',
        icon: 'success', // Puedes cambiar el icono (success, error, warning, info, etc.)
        confirmButtonText: 'Aceptar', // Texto del boton
        customClass: {
            container: 'mi-alerta',
            title: 'mi-titulo',
            content: 'mi-contenido',
            confirmButton: 'mi-boton'
        }
    });
}
// CONFIGURACION DE IMAGEN Y NOMBRE DE PERFIL DEL USUARIO

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

  const publicar = document.querySelector(".publicar");
  publicar.addEventListener("click", function(){
        window.location.href="trueques.html"
  })

  function mostrarAlertaRechazo(text) {
    Swal.fire({
        title: 'Error',
        text: `${text}`,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        customClass: {
            container: 'mi-alerta-error',
            title: 'mi-titulo-error',
            content: 'mi-contenido-error',
            confirmButton: 'mi-boton-error'
        }
    });
}