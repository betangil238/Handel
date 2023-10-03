const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}
const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    mostrarAlerta();
    localStorage.removeItem('login_success')
    setTimeout(() => {
        window.location.href='login.html';
    }, 2500);
})

// CONFIGURACION DE IMAGEN Y NOMBRE DE PERFIL DEL USUARIO
const perfil = document.querySelector(".container1imgPerfil");

if((user.name).toLowerCase()=="daniel betancur giraldo"){
    perfil.src='../Img/DanielBeta.jpeg'
}else if((user.name).toLowerCase()=="sofia quimbay cadena"){
    perfil.src='../Img/SofiaQuimbay.jpeg'
}else if((user.name).toLowerCase()=="laura valentina Leon castro"){
    perfil.src='../Img/ValeLeon.jpeg'
}else if((user.name).toLowerCase()=="maria juliana ortiz patiño"){
    perfil.src='../Img/JuliOrtiz.jpeg'
}else{
    perfil.src='../Img/perfilAlternativo.png'
}

const nombreperfil = document.querySelector(".nombreprofile");
nombreperfil.textContent=user.name;

const configuracion= JSON.parse(localStorage.getItem('configuracion'))
console.log(configuracion);
const usuarioperfil = document.getElementById("userCode");
const configuracionUsuario= configuracion.find(config =>  user.email ===config.email )
console.log(user.email);
usuarioperfil.textContent=configuracionUsuario.usuario;

// funcion que muestra una alerta de resultado exitoso
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

// FUNCION PARA CREAR MEDIANTE JSON ARTICULOS EN LA SECCION PPAL

