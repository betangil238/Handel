const links=document.querySelector(".linksNavBar ul");
const ul=links.querySelectorAll("ul");
const list=document.querySelector("#menuBurger")
const burgerMenu=document.querySelector(".burgerMenu")
const profileList=document.querySelector(".profileList");
const profileImg=document.querySelector(".profileImg");
let anchoPantalla = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

burgerMenu.addEventListener("click",()=>{
    const estilo=window.getComputedStyle(links);
    const estilo1=window.getComputedStyle(profileList);
    if(estilo.display==="none"){
        links.style.display="flex";
        if(estilo1.display==="flex"){
            profileList.style.display="none";
        }
    }else{
        links.style.display="none";
    }
})

profileImg.addEventListener("click",()=>{
    const estilo=window.getComputedStyle(links);
    const estilo1=window.getComputedStyle(profileList);
    if(anchoPantalla > 1255){
        if(estilo1.display==="none"){
            profileList.style.display="flex";
        }else{
            profileList.style.display="none";
        }
    }else{
        if(estilo1.display==="none"){
            profileList.style.display="flex";
            if(estilo.display=="flex"){
                links.style.display="none";
            }
        }else{
            profileList.style.display="none";
        }
    }
    
})

const notificaciones = document.querySelector(".notifications");
const icono = document.querySelector(".notificationIcon");
icono.addEventListener("click",function(){
    const estilo=window.getComputedStyle(notificaciones);
    if(estilo.display==="none"){
        notificaciones.style.display="flex";
    }else{
        notificaciones.style.display="none";
    }
})


const ajusteAlerta = document.querySelector(".ajustesRedirection");
// Captura de datos del local storage plasmados con el Item de configuracion
const configuracionLocal= JSON.parse(localStorage.getItem('configuracion'))
// Busqueda del usuario activo al cual corresponde el login sucess del local storage con el de configuracion
const configuracionUser= configuracionLocal.find(config =>  user.email ===config.email )
ajusteAlerta.addEventListener("click",function(){
// Validacion de autorizacion para la pagina de ajustes
if(configuracionUser.reset==1){
    mostrarAlertaRechazo("Lo sentimos,ya cambiaste tu nombre y usuario");

}else {
    window.location.href='ajustes.html';
}
}) 

function mostrarAlertaRechazo(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
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