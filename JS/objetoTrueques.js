let objetoCompleto = {} 

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

const user= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const crearObjTrueque = "https://handelrailway-production.up.railway.app/objtrueque"

async function crearObjetoTrueque(link, objeto){
    const formData = new FormData();
    formData.append("categoria", objeto.categoria);
    formData.append("descripcion", objeto.descripcion);
    formData.append("etiquetas", objeto.etiquetas);
    formData.append("idUsuario", objeto.idUsuario);
    formData.append("imagen", objeto.imagen, "nombre_imagen.jpg"); // Asegúrate de cambiar "nombre_imagen.jpg" al nombre real de la imagen
    formData.append("titulo", objeto.titulo);
    formData.append("visibilidad", objeto.visibilidad);
    fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
    });
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

const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    console.log("Entro")
    mostrarAlerta();
    localStorage.removeItem('login_success')
    setTimeout(() => {
        window.location.href='login.html';
    }, 2500);
})

const foto = localStorage.getItem("FotoObjeto")
const objeto = JSON.parse(localStorage.getItem("ObjetoInfo"))
if(objeto){
    
    const imagen = document.querySelector(".imagen");
    imagen.src = foto;

    // Crear un ArrayBuffer a partir de la cadena
    const buffer = new ArrayBuffer(foto.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i <foto.length; i++) {
    view[i] = foto.charCodeAt(i);
    }

    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([buffer], { type: 'text/plain' });

    objetoCompleto.imagen = blob
    objetoCompleto.titulo = objeto.titulo
    objetoCompleto.descripcion = objeto.descripcion
    objetoCompleto.etiquetas = objeto.etiquetas
    objetoCompleto.categoria = objeto.categoria
    objetoCompleto.visibilidad = objeto.visibilidad
}else{
    window.location.href = 'subirarchivo.html';
}

const titulo = document.querySelector(".titulo")
const descripcion = document.querySelector(".descripcion_Objeto")
titulo.textContent = objeto.titulo
descripcion.textContent = objeto.descripcion



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



const publicar = document.querySelector(".publicar");
publicar.addEventListener("click", function(){
    crearObjetoTrueque(crearObjTrueque,objetoCompleto)
    //window.location.href="trueques.html"
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

console.log(objetoCompleto);