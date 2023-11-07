let objetoTrueque = {}
let objetoNotificacion = {}

async function consultarDato(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}


//Id del trueque seleccionado en Local Storage
const idtrueque = JSON.parse(localStorage.getItem("idTrueque"))
const idTruequeSeleccionado = idtrueque.idTrueque
const notificacion = idtrueque.notificacion
const footer = document.querySelector(".footer")
if(notificacion == "1"){
    footer.style.display = "block"
}
objetoTrueque.idObjetoTrueque1 = idTruequeSeleccionado

const user= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const buscarTrueque = "https://handelrailway-production.up.railway.app/objtrueque/"+idTruequeSeleccionado;
const linkCrearTrueque = "https://handelrailway-production.up.railway.app/trueque";
const linkCrearNotificacion = "https://handelrailway-production.up.railway.app/notificacion";


const obtenerDatos1 = async () => {
    usuarioLogeado = await consultarDato(consultaEmail1);
    truequeSeleccionado = await consultarDato(buscarTrueque);
    const linkusuarioTrueque="https://handelrailway-production.up.railway.app/usuario/"+truequeSeleccionado.idUsuario;
    usuTrueque = await consultarDato(linkusuarioTrueque);
};

obtenerDatos1().then(() => {
    const fotoAutor = document.querySelector(".foto_autor")
    if(usuTrueque.imagen == null){
        fotoAutor.src='Img/perfilAlternativo.png'
    }else{
        const blob = base64ToBlob(usuTrueque.imagen, "image/jpeg");
        const urlDeObjeto = URL.createObjectURL(blob);
        fotoAutor.src = urlDeObjeto;
    }
    const nombreUsu = document.querySelector("#usuario")
    nombreUsu.textContent = usuTrueque.usuario1
    const foto = document.querySelector(".imagen");
    foto.src = truequeSeleccionado.imagen
    const titulo = document.querySelector(".tituloTrueque")
    titulo.textContent = truequeSeleccionado.titulo
    const descripcion = document.querySelector(".descripcionTrueque")
    descripcion.textContent = truequeSeleccionado.descripcion
    const vist = document.querySelector(".vistasTrueque")
    vist.textContent = truequeSeleccionado.vistas+" vistas"
    const likes = document.querySelector(".likesTrueque")
    likes.textContent = truequeSeleccionado.likes+" likes"
    if(usuTrueque.idUsuario == usuarioLogeado.idUsuario){
        const botones = document.querySelector(".botones_derecha")
        botones.style.display = "none"
    }
    const menu = document.getElementById("lista")
    const trueques = usuarioLogeado.objetosDeTrueque;
    trueques.forEach(e => {
        menu.innerHTML += `<option value="${e.titulo}">${e.titulo}</option>`
    })
    objetoNotificacion.idUsuario = usuTrueque.idUsuario
    const botonOfrecer = document.querySelector(".ofrecer")
    botonOfrecer.addEventListener("click",() => {
        if(menu.value == ""){
            mostrarAlertaRechazo("No tienes ningún objeto para truequear")
        }else{
            trueques.forEach(e => {
                if(menu.value == e.titulo){
                    objetoTrueque.idObjetoTrueque2 = e.idTrueques
                    const footer = document.querySelector(".footer")
                    if(footer.style.display == "none"){
                        objetoNotificacion.mensaje = `T${e.idTrueques}El usuario ${usuarioLogeado.usuario1} ha ofertado un ${e.titulo} por tu ${truequeSeleccionado.titulo}`
                    }else if(footer.style.display == "block"){
                        objetoNotificacion.mensaje = `MTu trueque del ${e.titulo} ha sido aceptado cambio de ${truequeSeleccionado.titulo}`
                    }
                    crearTrueque(linkCrearTrueque, objetoTrueque)
                }
            })
        }
    })
})


async function crearTrueque(link, objeto){
    const res = await fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto),
    });
    if(res.status == 400){
        mostrarAlertaRechazo("Este trueque ya fue creado")
    }else if (res.status == 200){
        crearNotificacion(linkCrearNotificacion,objetoNotificacion)
        mostrarAlertaTruequeExitoso()
        localStorage.removeItem("idTrueque")
        setTimeout(() => {
            window.location.href='pgppal.html';
        }, 2500);
    }else{
        mostrarAlertaRechazo("No se pudo subir el trueque")
    }
}

async function crearNotificacion(link, objeto){
    console.log(objeto);
    const res = await fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto),
    });
}

const flecha = document.querySelector(".bxs-left-arrow-circle")
flecha.addEventListener("click",() => {
    window.location.href='pgppal.html';
})



function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
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

//--------------ALERTAS----------------------

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

function mostrarAlertaTruequeExitoso() {
    Swal.fire({
        title: 'Trueque creado',
        text: 'Espera a que sea aceptado',
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

