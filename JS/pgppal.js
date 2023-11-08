async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}


function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
}

const user= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;
const linkSubastas="https://handelrailway-production.up.railway.app/objsubasta";
const linkUsuarios="https://handelrailway-production.up.railway.app/usuario";

if(window.location.href.includes("pgppal.html")){

    async function obtenerUsuarios(link){
        const res = await fetch(link);
        const data = await res.json();
        producirTrueques(data);
        obtenerSubastas(linkSubastas);
        clickTrueques()
        await clickSubastas()
    }

    obtenerUsuarios(linkUsuarios);
}

const conteinerTrueques = document.querySelector(".containerTruequeCards")
let urlPerfil
function producirTrueques(usuarios){
    usuarios.forEach(usu => {
        productos = usu.objetosDeTrueque
        if(usu.imagen == null){
            urlPerfil = 'Img/perfilAlternativo.png'
        }else{
            const blob = base64ToBlob(usu.imagen, "image/jpeg");
            urlPerfil = URL.createObjectURL(blob)
        }
        const nombrePerfil = usu.name2
        productos.forEach(e => {
            if(e.visibilidad == "Todos"){
                conteinerTrueques.innerHTML += `<div class="truequeCards ${e.idTrueques}" id="${e.idTrueques}">
                <img src="${e.imagen}" class="imgObjetoTrueque"><!--Imagen del objeto que está en trueque-->
                <div class="truequeCardInfo">
                    <img src="${urlPerfil}" class="imgPerfilTrueque"> <!--Imagen pequeña del perfil-->
                    <div class="cardsTruequeName">
                        <p>${nombrePerfil}</p> <!--Nombre del perfil de quien ofrece el objeto-->
                    </div>
                    <div class="truequeCardsIconNum">
                        <p><i class='bx bx-heart'></i>${e.likes}</p> <!--Icono y número de likes-->
                    </div>
                    <div class="truequeCardsIconNum">
                        <p><i class='bx bx-comment-detail'></i>0</p> <!--Icono y número de comentarios-->
                    </div>
                </div>
                </div>`
            }
            
        }); 
    })
   
}
const historias = document.querySelector(".historias")
async function producirSubastas(productos){
    productos.forEach(e => {
        if(e.visibilidad == "Todos"){
            historias.innerHTML += `<img src="${e.imagen}" class="container2ImgTrends" id="${e.idsubastas}">`
        }
    }); 
}

if(window.location.href.includes("pgppal.html")){

    function clickTrueques(){
        const containerTrueques = document.querySelectorAll(".truequeCards")
        containerTrueques.forEach(e => {
            e.addEventListener("click", function(){
                const idTrueque = e.id;
                localStorage.setItem("idTrueque", JSON.stringify({"idTrueque":idTrueque}))
                window.location.href='objetoTrueques.html';
            })
        })
    }
}

async function clickSubastas(){
    const histo = document.querySelector(".historias")
    histo.addEventListener("click", function(e){
        const imagenClick = e.target 
        let idImagen = imagenClick.id
        localStorage.setItem("idSubasta", JSON.stringify({"idSubasta": idImagen}))
        window.location.href='objetoSubastas.html';
    })
}

async function obtenerSubastas(link){
    const res = await fetch(link);
    const data = await res.json();
    await producirSubastas(data)
}

const obtenerDatos = async () => {
    data = await consultarUsuario(consultaEmail);
};

obtenerDatos().then(() => {
    if(window.location.href.includes("ajustes.html")){

    }else {
        let tamano
        if(data.reset == 1 && window.location.href.includes("ajustes.html")){
            window.location.href='pgppal.html';
        }

        const notificaciones = document.querySelector(".notifications")
        const cantidad = document.querySelector(".cantidad")
        if(data.notificaciones != null){
            const noti = data.notificaciones
            tamano = (noti.length) + 1
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
                    notificaciones.innerHTML += `<a class="notificacionTruequeExitoso" href="mensajes.html"><span class="material-symbols-outlined">notification_important</span>${nuevoMensaje}</a>`
                }else{
                    notificaciones.innerHTML += `<p><span class="material-symbols-outlined">notification_important</span>${e.mensaje}</p>`
                }
            })
        }else{
            tamano = 1
        }
        cantidad.textContent = tamano

        const notificacionesLink = document.querySelectorAll(".notificacionNuevoTrueque")
        notificacionesLink.forEach( e => {
            e.addEventListener("click", () =>{
                const idT = e.id
                localStorage.setItem("idTrueque", JSON.stringify({"idTrueque": idT, "notificacion" : 1}))
                window.location.href = 'objetoTrueques.html'
            })
        })
    }

// Configuracion para salir de la pagina y redireccionar al login
const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    mostrarAlerta('Hasta pronto');
    localStorage.removeItem('login_success')
    setTimeout(() => {
        window.location.href='login.html';
    }, 2500);
})

if(window.location.href.includes("pgppal.html")){
const icono = document.getElementById("bell");
const notificaciones = document.querySelector(".notifications");
icono.addEventListener("click",function(){
    const estilo=window.getComputedStyle(notificaciones);
    if(estilo.display==="none"){
        notificaciones.style.display="flex";
    }else{
        notificaciones.style.display="none";
    }
})
}
if(window.location.href.includes("pgppal.html")){
    const botonCargarFoto = document.querySelector(".cargarfoto")
    botonCargarFoto.addEventListener("click", async function(){
        const fileInput = document.querySelector('.inputfoto');
        const file = fileInput.files[0]; // Obtener el archivo seleccionado
        if(file){
            const linkFoto="https://handelrailway-production.up.railway.app/usuario/"+data.idUsuario+"/imagen";
            const imagenBlob = await crearFoto2();
            await actualizarFoto(linkFoto,imagenBlob); 
            setTimeout(() => {
                window.location.href='pgppal.html';
            }, 1500);
        }else{
            mostrarAlertaRechazo("Por favor carga una imagen")
        }
    })
    }

if(!data.imagen){
// CONFIGURACION DE IMAGEN Y NOMBRE DE PERFIL DEL USUARIO
    const perfil = document.querySelector(".container1imgPerfil");
    if((data.name2).toLowerCase()=="daniel betancur giraldo"){
        perfil.src='Img/DanielBeta.jpeg'
    }else if((data.name2).toLowerCase()=="sofia quimbay cadena"){
        perfil.src='Img/SofiaQuimbay.jpeg'
    }else if((data.name2).toLowerCase()=="laura valentina Leon castro"){
        perfil.src='Img/ValeLeon.jpeg'
    }else if((data.name2).toLowerCase()=="maria juliana ortiz patiño"){
        perfil.src='Img/JuliOrtiz.jpeg'
    }else{
        perfil.src='Img/perfilAlternativo.png'
    }
}else{
    const perfil = document.querySelector(".container1imgPerfil");
    const blob = base64ToBlob(data.imagen, "image/jpeg");
    const urlDeObjeto = URL.createObjectURL(blob);
    perfil.src = urlDeObjeto;
}


if(window.location.href.includes("ajustes.html")){
    if (obtenerDatos.reset==1) {
        window.location.href="pgppal.html"  
    }
}


// conexion del icono y texto de ajustes en la pagina principal y ajustes
const ruedaConfiguracion=document.querySelector(".ruedaconfig");
// Escuchador de eventos mediante click en la seccion de ajustes o pg ppal
ruedaConfiguracion.addEventListener("click",function(){
// Condicional que verifica si esta en la pagina principal
    if(window.location.href.includes("pgppal.html")){
        // Si ya realizo un cambio muestra una alerta de rechazo sino realiza la redireccion a ajustes
        if(data.reset==1){
            mostrarAlertaRechazo("Lo sentimos,ya cambiaste tu nombre y usuario");
        }else {
            window.location.href='ajustes.html';
        }
        // Condicional que verifica si esta en la pagina ajustes
    }else if(window.location.href.includes("ajustes.html")){
        // Si ya realizo un cambioredireccion a pagina principal en caso contrario se da acceso
        if(data.reset==1){
            window.location.href='pgppal.html';
        }else {
            window.location.href='ajustes.html';
        }
    }
})
// Este fragmento de codigo es el que asigna el nombre y usuario en el panel lateral izquierdo
const nombreperfil = document.querySelector(".nombreprofile");
const usuarioperfil = document.getElementById("userCode");
const numTrueques = document.querySelector(".numTrueques")
const numSubastas = document.querySelector(".numSubastas")
nombreperfil.textContent=data.name2;
usuarioperfil.textContent=data.usuario1;
if(data.objetosDeTrueque != 0 ){
    numTrueques.textContent = data.objetosDeTrueque.length
}

if(data.objetosDeSubasta != 0){
    numSubastas.textContent= data.objetosDeSubasta.length
}

if(window.location.href.includes("ajustes.html")){
const inputname = document.getElementById("name");
// Este listener de Eventos se activa cada que se escribe una letra y modifica el panel izquierdo para el nombre
inputname.addEventListener('input', e=>{
    const valor=inputname.value;
    if (/\d/.test(valor)) {
        mostrarAlertaRechazo("No se admiten numeros en el nombre");
        inputname.value = inputname.value.replace(/\d/g, ""); // Eliminar los números
    } 
    if(valor==""){
        nombreperfil.textContent=data.name2;
    }else{
        nombreperfil.textContent=valor;
    }
})

// Este listener de Eventos se activa cada que se escribe una letra y modifica el panel izquierdo para el usuario
const inputusuario = document.getElementById("usuario");
inputusuario.addEventListener('input', e=>{
    const valor=inputusuario.value;
    if(valor==""){
        usuarioperfil.textContent=data.usuario1;
    }else{
        usuarioperfil.textContent="@"+valor;
    }
})


const guardar = document.getElementById("guardar");
// Aqui se genera las acciones al dar click en guardar
guardar.addEventListener("click",async function(){
                            // // verifica si el usuario que se va a asignar ya existe
                            // const verificacion= configuracion.find(config =>  ("@"+inputusuario.value) ===config.usuario1)
    const consultaUsuario="https://handelrailway-production.up.railway.app/usuario/validusuario/@"+inputusuario.value;
    const validarUsuario = await buscarUsuario(consultaUsuario);
    if(validarUsuario){
        mostrarAlertaRechazo("Lo sentimos,este usuario ya existe");
    }else{
        // verifica que ningun campo este vacio
        if(inputusuario.value=="" || inputname.value==""){
            mostrarAlertaRechazo("Campos vacios");
        }else{
            data.name2=inputname.value;
            data.usuario1="@"+inputusuario.value
            data.reset=1
            const linkUser="https://handelrailway-production.up.railway.app/usuario";
            await actualizarUsuario(linkUser,data);   
            const fileInput = document.querySelector('.file-upload-input');
            const file = fileInput.files[0]; // Obtener el archivo seleccionado
            if(file){
                const linkFoto="https://handelrailway-production.up.railway.app/usuario/"+data.idUsuario+"/imagen";
                const imagenBlob = await crearFoto();
                await actualizarFoto(linkFoto,imagenBlob); 
            }

                        // // Borramos del local storage toda la seccion de configuracion, debido que no podemos modificar directamente el objeto que ya tiene la informacion sin actualizar almacenada
                        // localStorage.removeItem('configuracion');
                        // // Busca el indice en el arreglo obtenido del local storage capturado en configuracion con los datos de "ConfiguracionUsuario"
                        // let indiceAEliminar =  configuracion.indexOf(configuracionUsuario);
                        // // Elimina del array el objeto
                        // configuracion.splice(indiceAEliminar,1);
                        // // Cambiamos los atributos del objeto eliminado en el arreglo
                        // configuracionUsuario.name2=inputname.value;
                        // configuracionUsuario.usuario1="@"+inputusuario.value;
                        // configuracionUsuario.reset=1;
                        // // Agregamos el objeto actualizado con los parametros correspondientes
                        // configuracion.push(configuracionUsuario);
                        // // Creamos nuevamente la seccion configuracion con toda la informacion actualizada
                        // localStorage.setItem('configuracion', JSON.stringify(configuracion))
                        // // Notificamos un cambio exitoso y redireccionamos a la pagina ppal luego de 2 segundos y medio
            mostrarAlerta('Cambios guardados con exito');
            setTimeout(() => {
                window.location.href='pgppal.html';
            }, 2500);
        }
    }
})
}
// CODIGO PARA EL MENU DESPLEGABLE DE LA IMAGEN DE PERFIL
const menuDesplegable = document.querySelector(".containerDesplegable");
const imagenclick= document.querySelector(".container1imgPerfil");
const nombreperfil1 = document.querySelector(".nombreprofile1");
const usuarioperfil1 = document.getElementById("userCode1");
const todo = document.querySelector(":not(.containerDesplegable)");
const tituloFoto=document.querySelector(".tituloFoto");
const botonCargar=document.querySelector(".cargarfoto");
const salirProfile= document.querySelector(".salir");
imagenclick.addEventListener("click",function(){
    if((window.getComputedStyle(menuDesplegable)).display=="none"){
        menuDesplegable.style.display="flex"
    }else{
        menuDesplegable.style.display="none"
    } 
    if(data.reset==0){
        nombreperfil1.textContent=data.name2;
        usuarioperfil1.textContent=data.usuario1;
    }else{
        nombreperfil1.textContent=data.name2;
        usuarioperfil1.textContent=data.usuario1;
    }
    if(window.screen.width>805){
        nombreperfil1.style.display="none"
        usuarioperfil1.style.display="none"
        menuDesplegable.style.height="30%"
        menuDesplegable.style.top="35%"
        menuDesplegable.style.left="150%"
        menuDesplegable.style.width="100%"
        menuDesplegable.style.backgroundColor="black"
    }else if(window.screen.width>500){
        nombreperfil1.style.display="none"
        usuarioperfil1.style.display="flex"
        menuDesplegable.style.height="300%"
        menuDesplegable.style.top="80px"
        menuDesplegable.style.left="58%"
        menuDesplegable.style.width="40%"
        menuDesplegable.style.backgroundColor="#333"
    }else{
        nombreperfil1.style.display="flex"
        usuarioperfil1.style.display="flex"
        tituloFoto.style.display="none";
        menuDesplegable.style.backgroundColor="#333"
        botonCargar.style.width="50%"
        botonCargar.style.marginLeft="25%"
    }
});

salirProfile.addEventListener("click",function(){
    menuDesplegable.style.display="none"
});





const conteinerSubastas = document.querySelector(".historias")






// funcion que muestra una alerta de resultado exitoso
function mostrarAlerta(mensaje) {
    Swal.fire({
        title: 'Muchas gracias',
        text: mensaje,
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
});

async function buscarUsuario(link){
    const res = await fetch (link);
    const data = await res.json();
    return data
}

async function actualizarUsuario(link,usuario){
    fetch(link,{
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
}

async function actualizarFoto(link,foto){
    const formData = new FormData();
    formData.append('imagen', foto);
    fetch(link,{
        method: "PATCH",
        body: formData,
    })
}

async function crearFoto() {
    return new Promise((resolve, reject) => {
        const fileInput = document.querySelector('.file-upload-input');
        const file = fileInput.files[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const blob = new Blob([arrayBuffer], { type: file.type });
                resolve(blob);
            };
            reader.readAsArrayBuffer(file);
        } 
    });
}

async function crearFoto2() {
    return new Promise((resolve, reject) => {
        const fileInput = document.querySelector('.inputfoto');
        const file = fileInput.files[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const blob = new Blob([arrayBuffer], { type: file.type });
                resolve(blob);
            };
            reader.readAsArrayBuffer(file);
        } 
    });
}