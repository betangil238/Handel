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





// Captura de datos del local storage plasmados con el Item de configuracion
//const configuracionLocal= JSON.parse(localStorage.getItem('configuracion'))
// Busqueda del usuario activo al cual corresponde el login sucess del local storage con el de configuracion
//const configuracionUser= configuracionLocal.find(config =>  user.email ===config.email )

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}


const loginsucess = JSON.parse(localStorage.getItem('login_success'))

const consultaEmail="https://handelrailway-production.up.railway.app/usuario/validacion/"+loginsucess.email;

const obtenerDatos = async () => {
    data = await consultarUsuario(consultaEmail);
};

obtenerDatos().then(() => {
    const notificaciones = document.querySelector(".notifications")
    if(data.notificaciones != null){
        const noti = data.notificaciones
        noti.forEach(e =>{
            let contador = 1
            let id = ""
            if(e.mensaje[0] == "T"){
                for(contador; contador <(e.mensaje).length; contador++){
                    if(parseInt(e.mensaje[contador]) >= 0){
                        id += e.mensaje[contador]
                    }else{
                        break
                    }
                }
                const mensaje = e.mensaje
                const nuevoMensaje = mensaje.slice(contador, mensaje.length)
                notificaciones.innerHTML += `<a class="notificacionNuevoTrueque" id="${id}"><span class="material-symbols-outlined">notification_important</span>${nuevoMensaje}</a>`
            }else if(e.mensaje[0] == "M"){
                const mensaje = e.mensaje
                const nuevoMensaje = mensaje.slice(1, mensaje.length)
                notificaciones.innerHTML += `<a class="notificacionTruequeExitoso" id="campana2" href="mensajes.html"><span class="material-symbols-outlined">notification_important</span>${nuevoMensaje}</a>`
            }else if(e.mensaje[0] == "G" || e.mensaje[0] == "g" ){
                notificaciones.innerHTML += `<a class="notificacionCierre" id="campana2" href="notificacionCierre.html"><span class="material-symbols-outlined">notification_important</span>${e.mensaje}</a>`
            }else{
                notificaciones.innerHTML += `<p><span class="material-symbols-outlined">notification_important</span>${e.mensaje}</p>`
            }
        })
    }

    const notificacionesLink = document.querySelectorAll(".notificacionNuevoTrueque")
    notificacionesLink.forEach( e => {
        e.addEventListener("click", () =>{
            const idT = e.id
            localStorage.setItem("idTrueque", JSON.stringify({"idTrueque": idT, "notificacion" : 1}))
            window.location.href = 'objetoTrueques.html'
        })
    })

    const ajusteAlerta = document.querySelector(".ajustesRedirection");
    ajusteAlerta.addEventListener("click",function(){
    // Validacion de autorizacion para la pagina de ajustes
    if(data.reset==1){
        mostrarAlertaRechazo("Lo sentimos,ya cambiaste tu nombre y usuario");
    }else {
        window.location.href='ajustes.html';
    }
}) 
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

/*Funcionalidades Billetera*/
const billetera = document.getElementById("wallet");
const mostrarBilletera = document.querySelector(".containerBilletera");

billetera.addEventListener("click", function () {
   if(getComputedStyle(mostrarBilletera).display == "none") {
    mostrarBilletera.style.display = "flex";
   } else {
    mostrarBilletera.style.display = "none";
   }
});





