const user= JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href='login.html';
}

let objetoCompleto = {} 

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}


const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const crearObjTrueque = "https://handelrailway-production.up.railway.app/objtrueque"

async function crearObjetoTrueque(link, objeto){
    const res = await fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto),
    });
    if (res.status == 200){
        localStorage.removeItem("FotoObjeto")
        localStorage.removeItem("ObjetoInfo")
        localStorage.removeItem("imagenActual")
        mostrarAlertaTruequeExitoso()
        setTimeout(() => {
            window.location.href='trueques.html';
        }, 2500);
    }else{
        mostrarAlertaRechazo("No se pudo subir el trueque")
    }
}

const obtenerDatos1 = async () => {
    data = await consultarUsuario(consultaEmail1);
};

obtenerDatos1().then(() => {
    const fotoAutor = document.querySelector(".foto_autor")
    if(data.imagen == null){
        fotoAutor.src='Img/perfilAlternativo.png'
    }else{
        const blob = base64ToBlob(data.imagen, "image/jpeg");
        const urlDeObjeto = URL.createObjectURL(blob);
        fotoAutor.src = urlDeObjeto;
    }
    const nombreUsu = document.querySelector("#usuario")
    nombreUsu.textContent = data.usuario1
    objetoCompleto.idUsuario = data.idUsuario
})

function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
}


const foto = localStorage.getItem("FotoObjeto")
const objeto = JSON.parse(localStorage.getItem("ObjetoInfo"))
if(objeto){
    const imagen = document.querySelector(".imagen");
    imagen.src = foto;
    objetoCompleto.imagen = foto
    objetoCompleto.titulo = objeto.titulo
    objetoCompleto.descripcion = objeto.descripcion
    objetoCompleto.etiquetas = objeto.etiquetas
    objetoCompleto.categoria = objeto.categoria
    objetoCompleto.visibilidad = objeto.visibilidad
}else{
    window.location.href = 'subirarchivo.html';
}

const publicar = document.querySelector(".publicar");
publicar.addEventListener("click", function(){
    crearObjetoTrueque(crearObjTrueque,objetoCompleto) 
    setTimeout(() => {
        window.location.href="trueques.html"
    }, 2500);
})

const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    mostrarAlerta();
    localStorage.removeItem('login_success')
    
})

const titulo = document.querySelector(".titulo")
const descripcion = document.querySelector(".descripcion_Objeto")
titulo.textContent = objeto.titulo
descripcion.textContent = objeto.descripcion


function mostrarAlertaTruequeExitoso() {
    Swal.fire({
        title: 'Trueque subido',
        text: 'Sigue navegando',
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

