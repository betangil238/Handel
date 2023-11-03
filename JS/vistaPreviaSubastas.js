let objetoCompleto = {} 

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}

const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const crearObjSubasta = "https://handelrailway-production.up.railway.app/objsubasta"

async function crearObjetoSubasta(link, objeto){
    const res = await fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto),
    });
    console.log(res);
    if (res.status == 200){
        setTimeout(() => {
            window.location.href='subastas.html';
        }, 2500);
    }else{
        mostrarAlertaRechazo("No se pudo subir la subasta")
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
console.log(foto);
const objeto = JSON.parse(localStorage.getItem("ObjetoInfo"))
console.log(objeto);
const visi = document.querySelector(".visi")
if(objeto){
    const imagen = document.querySelector(".imagen");
    imagen.src = foto;
    visi.textContent = objeto.visibilidad
    objetoCompleto.imagen = foto
    objetoCompleto.titulo = objeto.titulo
    objetoCompleto.descripcion = objeto.descripcion
    objetoCompleto.etiquetas = objeto.etiquetas
    objetoCompleto.categoria = objeto.categoria
    objetoCompleto.visibilidad = objeto.visibilidad
}else{
    window.location.href = 'subirarchivo.html';
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

const publicar = document.querySelector(".publicar");
publicar.addEventListener("click", function(){
    if(inputPrecio.value=="" && inputIncremento.value=="" ){
        mostrarAlertaRechazo("Llene ambos campos")
    }else if(inputPrecio.value==""){
        mostrarAlertaRechazo("Llene el campo de precio")
    }else if(inputIncremento.value==""){
        mostrarAlertaRechazo("Llene el campo de incremento")
    }else{
        objetoCompleto.incremento = inputIncremento.value
        objetoCompleto.valor = inputPrecio.value
        crearObjetoSubasta(crearObjSubasta, objetoCompleto)
    }
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