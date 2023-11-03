async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}

const user= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail="https://handelrailway-production.up.railway.app/usuario/validacion/"+user.email;

const obtenerDatos = async () => {
    data = await consultarUsuario(consultaEmail);
};


obtenerDatos().then(() => {

    if(data.reset == 1 && window.location.href.includes("ajustes.html")){
        window.location.href='pgppal.html';
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

function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
}




// Conexion de datos con los ID y clases del HTML de pgppal y ajustes
const nombreperfil = document.querySelector(".nombreprofile");
const usuarioperfil = document.getElementById("userCode");
                    // Captura de datos del local storage plasmados con el Item de configuracion
                    const configuracion= JSON.parse(localStorage.getItem('configuracion'))
                    // Busqueda del usuario activo al cual corresponde el login sucess del local storage con el de configuracion
                    const configuracionUsuario= configuracion.find(config =>  user.email ===config.email )
                    // Validacion de autorizacion para la pagina de ajustes
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
nombreperfil.textContent=data.name2;
usuarioperfil.textContent=data.usuario1;

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
const salirProfile= document.querySelector(".Salir");
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