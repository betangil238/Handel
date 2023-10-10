const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
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


// CONFIGURACION DE IMAGEN Y NOMBRE DE PERFIL DEL USUARIO
const perfil = document.querySelector(".container1imgPerfil");

if((user.name).toLowerCase()=="daniel betancur giraldo"){
    perfil.src='Img/DanielBeta.jpeg'
}else if((user.name).toLowerCase()=="sofia quimbay cadena"){
    perfil.src='Img/SofiaQuimbay.jpeg'
}else if((user.name).toLowerCase()=="laura valentina Leon castro"){
    perfil.src='Img/ValeLeon.jpeg'
}else if((user.name).toLowerCase()=="maria juliana ortiz patiño"){
    perfil.src='Img/JuliOrtiz.jpeg'
}else{
    perfil.src='Img/perfilAlternativo.png'
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
    if (configuracionUsuario.reset==1) {
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
        if(configuracionUsuario.reset==1){
            mostrarAlertaRechazo("Lo sentimos,ya cambiaste tu nombre y usuario");
        }else {
            window.location.href='ajustes.html';
        }
        // Condicional que verifica si esta en la pagina ajustes
    }else if(window.location.href.includes("ajustes.html")){
        // Si ya realizo un cambioredireccion a pagina principal en caso contrario se da acceso
        if(configuracionUsuario.reset==1){
            window.location.href='pgppal.html';
        }else {
            window.location.href='ajustes.html';
        }
    }
})

// Este fragmento de codigo es el que asigna el nombre y usuario en el panel lateral izquierdo
if(configuracionUsuario.reset==0){
    nombreperfil.textContent=user.name;
    usuarioperfil.textContent=configuracionUsuario.usuario;
}else{
    nombreperfil.textContent=configuracionUsuario.name2;
    usuarioperfil.textContent=configuracionUsuario.usuario1;
}

const inputname = document.getElementById("name");
// Este listener de Eventos se activa cada que se escribe una letra y modifica el panel izquierdo para el nombre
inputname.addEventListener('input', e=>{
    const valor=inputname.value;
    if (/\d/.test(valor)) {
        mostrarAlertaRechazo("No se admiten numeros en el nombre");
        inputname.value = inputname.value.replace(/\d/g, ""); // Eliminar los números
    } 
    if(valor==""){
        nombreperfil.textContent=user.name;
    }else{
        nombreperfil.textContent=valor;
    }
})
// Este listener de Eventos se activa cada que se escribe una letra y modifica el panel izquierdo para el usuario
const inputusuario = document.getElementById("usuario");
inputusuario.addEventListener('input', e=>{
    const valor=inputusuario.value;
    if(valor==""){
        usuarioperfil.textContent=configuracionUsuario.usuario;
    }else{
        usuarioperfil.textContent="@"+valor;
    }
})




const guardar = document.getElementById("guardar");
// Aqui se genera las acciones al dar click en guardar
guardar.addEventListener("click",function(){
    // verifica si el usuario que se va a asignar ya existe
    const verificacion= configuracion.find(config =>  ("@"+inputusuario.value) ===config.usuario1)
    if(verificacion){
        mostrarAlertaRechazo("Lo sentimos,este usuario ya existe");
    }else{
        // verifica que ningun campo este vacio
        if(inputusuario.value=="" || inputname.value==""){
            mostrarAlertaRechazo("Campos vacios");
        }else{
            // Busca el indice en el arreglo obtenido del local storage capturado en configuracion con los datos de "ConfiguracionUsuario"
            let indiceAEliminar =  configuracion.indexOf(configuracionUsuario);
            // Elimina del array el objeto
            configuracion.splice(indiceAEliminar,1);
            // Cambiamos los atributos del objeto eliminado en el arreglo
            configuracionUsuario.name2=inputname.value;
            configuracionUsuario.usuario1="@"+inputusuario.value;
            configuracionUsuario.reset=1;
            // Agregamos el objeto actualizado con los parametros correspondientes
            configuracion.push(configuracionUsuario);
            // Borramos del local storage toda la seccion de configuracion, debido que no podemos modificar directamente el objeto que ya tiene la informacion sin actualizar almacenada
            localStorage.removeItem('configuracion');
            // Creamos nuevamente la seccion configuracion con toda la informacion actualizada
            localStorage.setItem('configuracion', JSON.stringify(configuracion))
            // Notificamos un cambio exitoso y redireccionamos a la pagina ppal luego de 2 segundos y medio
            mostrarAlerta('Cambios guardados con exito');
            setTimeout(() => {
                window.location.href='pgppal.html';
            }, 2500);
        }
        
    }
})

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