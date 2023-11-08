//let objetoSubasta = {}

async function consultarDato(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

//Id del trueque seleccionado en Local Storage
const idsubasta = JSON.parse(localStorage.getItem("idSubasta"))
const idSubastaSeleccionada = idsubasta.idSubasta
//objetoSubasta.idSubasta = idSubastaSeleccionada

const user= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const buscarSubasta = "https://handelrailway-production.up.railway.app/objsubasta/"+idSubastaSeleccionada;
const actualizarSubasta = "https://handelrailway-production.up.railway.app/objsubasta";


const obtenerDatos1 = async () => {
    usuarioLogeado = await consultarDato(consultaEmail1);
    subastaSeleccionada = await consultarDato(buscarSubasta);
    const linkusuarioSubasta="https://handelrailway-production.up.railway.app/usuario/"+subastaSeleccionada.idUsuario;
    const consultarUsuario="https://handelrailway-production.up.railway.app/usuario/"+subastaSeleccionada.idGanador;
    usuarioGandor = await consultarDato(consultarUsuario)
    usuSubasta = await consultarDato(linkusuarioSubasta);

};

obtenerDatos1().then(() => {
    const fotoAutor = document.querySelector(".foto_autor")
    if(usuSubasta.imagen == null){
        fotoAutor.src='Img/perfilAlternativo.png'
    }else{
        const blob = base64ToBlob(usuSubasta.imagen, "image/jpeg");
        const urlDeObjeto = URL.createObjectURL(blob);
        fotoAutor.src = urlDeObjeto;
    }
    const nombreUsu = document.querySelector("#usuario")
    nombreUsu.textContent = usuSubasta.usuario1
    const foto = document.querySelector(".imagen");
    foto.src = subastaSeleccionada.imagen
    const titulo = document.querySelector(".tituloSubasta")
    titulo.textContent = subastaSeleccionada.titulo
    const descripcion = document.querySelector(".descripcionSubasta")
    descripcion.textContent = subastaSeleccionada.descripcion
    const vist = document.querySelector(".vistasSubastas")
    vist.textContent = subastaSeleccionada.vistas+" vistas"
    const likes = document.querySelector(".likesSubastas")
    likes.textContent = subastaSeleccionada.likes+" likes"
    const usuGandor = document.querySelector(".usuario_Oferta")
    if(subastaSeleccionada.idGanador == null ){
        usuGandor.textContent = "@user"
    }else{
        usuGandor.textContent = usuarioGandor.usuario1
    }
    const valor = document.querySelector(".valor_Autor")
    valor.textContent = "$"+subastaSeleccionada.valor
    const visibi = document.querySelector(".visi")
    visibi.textContent = subastaSeleccionada.visibilidad
    const incre = document.querySelector(".incremento_Fijo")
    incre.textContent = "$"+subastaSeleccionada.incremento
    if(usuSubasta.idUsuario == usuarioLogeado.idUsuario || subastaSeleccionada.idGanador == usuarioLogeado.idUsuario){
        const botones = document.querySelector(".botones_derecha")
        botones.style.display = "none"
    }
    const botonPujar = document.querySelector(".pujar")
    botonPujar.addEventListener("click",async () => {
        if(inputAu.value == ""){
            mostrarAlertaRechazo("Diligencia el incremento")
        }else if(inputAu.value < subastaSeleccionada.incremento){
            mostrarAlertaRechazo("El incremento mínimo es de $"+subastaSeleccionada.incremento)
        }else{
            subastaSeleccionada.valor += parseInt(inputAu.value)
            subastaSeleccionada.idGanador = usuarioLogeado.idUsuario
            subastaSeleccionada.vistas += 1
            console.log(1);
            actualizarSub(actualizarSubasta,subastaSeleccionada)
        }
    })

})

async function actualizarSub(link,objeto){
    const res = await fetch(link,{
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto),
    })
    console.log(res);    
    if(res.status == 200){
        mostrarAlertaPujaExitosa()
        setTimeout(() => {
            window.location.href='subastas.html';
        },2500);
    }else{
        mostrarAlertaRechazo("No se pudo realizar la puja")
    }
}



const inputAu = document.querySelector(".input_IncrementoAdd")
inputAu.addEventListener("input", function() {
    // Obtén el valor actual del campo de entrada
    const valor = inputAu.value;
    // Elimina cualquier caracter que no sea un número usando una expresión regular
    const valorNumerico = valor.replace(/[^0-9]/g, '');
    // Actualiza el valor del campo de entrada con solo números
    inputAu.value = valorNumerico;
});

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

function mostrarAlertaPujaExitosa() {
    Swal.fire({
        title: 'Puja exitosa',
        text: 'Debes estar atento a otras pujas ',
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

