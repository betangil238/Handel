//Inicializamos una variable que recibirá los datos del formulario
// const validar = document.querySelector('#submit')
// Inicializamos la función que nos permitirá loguerse
// validar.addEventListener('click', (e) => {
  
//     e.preventDefault()
//     let email = document.querySelector('#email').value
//     console.log(email);
//     const Users = JSON.parse(localStorage.getItem('users')) || []
//     // Aquí validamos si los datos son iguales a los que se registraron
//     validUser = Users.find(user => user.email === email)
//     console.log(validUser);
//     // Inicializamos un condicional, especificando de que si los datos son diferentes, no nos permita iniciar sesión
//     if(!validUser) {
//         mostrarAlertaRechazo(`Este usuario no existe- Registrate`);
//         setTimeout(() => {
//             window.location.href = 'registro.html';
//         }, 2500);
//         // return alert ('Usuario y/o contraseña son incorrectos o no existen')
//     }else{
//             window.location.href = 'newPassword.html';
//     }
// })
// Funcion que se ejecuta con click desde el HTML de FORGOTPASSWORD

if(window.location.href.includes("forgotPassword.html")){
function validar(){
    const verificacionPrevia= JSON.parse(localStorage.getItem('USUARIO')) || false
    if (verificacionPrevia) {
        localStorage.removeItem('USUARIO'); 
    }
    let email = document.querySelector('#email').value
    console.log(email);
    const Users = JSON.parse(localStorage.getItem('users')) || []
    // Aquí validamos si los datos son iguales a los que se registraron
    let validUser = Users.find(user => user.email === email)
    // CREAMOS TEMPORALMENTE UNA SESION DE ALMACENAMIENTO DE DATOS EN EL LOCAL STORAGE
    localStorage.setItem('USUARIO', JSON.stringify(validUser));
    // Inicializamos un condicional, especificando de que si los datos son diferentes, no nos permita iniciar sesión
    if(!validUser) {
        mostrarAlertaRechazo(`Este usuario no existe- Registrate`);
        setTimeout(() => {
            window.location.href = 'registro.html';
        }, 2500);
        // return alert ('Usuario y/o contraseña son incorrectos o no existen')
    }else{
            window.location.href = 'newPassword.html';  
    }
}

const validarCorreo= document.getElementById("submit")
validarCorreo.addEventListener("click",function(){
    validar();
})

}


if(window.location.href.includes("newPassword.html")){
const contra = document.getElementById('submit1');
contra.addEventListener('click', (e)=>{
    // TOMAMOS LOS DATOS DEL LOCAL STORAGE KEY usuario, CREADO EN EL HTML FORGOT PASSWORD
    const usuario = JSON.parse(localStorage.getItem('USUARIO'));
    // CAPTURAMOS LA CONTRASENA DEL INPUT
    let p1 = document.getElementById("password").value;
    if(validarpassword()){
        // SI LA CONTRASENA ES VALIDA TOMA TODOS LOS ELEMENTOS DE LA KEY USER Y LA ALMACENA EN EL ARRAY Users
        const Users = JSON.parse(localStorage.getItem('users')) || []
        // almacena en validuser el usuario con el correo traido
        const validUser = Users.find(user => user.email === usuario.email)
        // le cambiamos la contrasena al usuario capturado en forgotpassword
        usuario.password=p1;
        // eliminamos completamente la key de users, pero los datos se almacenaron en USERS (variable)
        localStorage.removeItem('users')
        // Buscamos dentro del array users la posicion del elemento con contrasena a cambiar
        let indiceAEliminar =  Users.indexOf(validUser);
        // eliminamos del array el dato que vamos a cambiar
        Users.splice(indiceAEliminar,1);
        // ingresamos el valor corregido al array users
        Users.push(usuario);
        // creamos en el local storage un contenedor con el dato actualizado, con el nombre que estaba previamente
        localStorage.setItem('users', JSON.stringify(Users))
        // eliminamos el contenedor USUARIO temporal que nos sirvio para capturar la informacion del forgot password
        localStorage.removeItem('USUARIO');
        mostrarAlerta();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2500);
    }
})
}


function validarpassword(){
    //Id de contraseña de HTML
    let p1 = document.getElementById("password").value;
    let p2 = document.getElementById("password1").value;
    //Evita que queden espacios en blanco
    let espacios = false;
    let cont = 0;
        while (!espacios && (cont < p1.length)) {
            if (p1.charAt(cont) == " ")
                espacios = true;
                cont++;
        }
    //Evita que quede un campo de contraseña vacío
        if (espacios) {
            mostrarAlertaRechazo("La contraseña no puede contener espacios en blanco")
            return false;
        }
        if (p1.length == 0 || p2.length == 0) {
            mostrarAlertaRechazo("La contraseña no puede contener espacios en blanco");
            // alert("Los campos de la password no pueden quedar vacios");
            return false;
        }
      //Validar que las contraseñas coincidan 
        if (p1 != p2) {
            mostrarAlertaRechazo("Las contraseñas deben de coincidir");
            return false;
        } else {
            return true; 
        }
    }

    function mostrarAlerta() {
        Swal.fire({
            title: 'Cambio de contraseña',
            text: 'exitoso',
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
    // funcion que muestra una alerta de error
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