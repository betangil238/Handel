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
function validar(){
    let email = document.querySelector('#email').value
    console.log(email);
    const Users = JSON.parse(localStorage.getItem('users')) || []
    // Aquí validamos si los datos son iguales a los que se registraron
    let validUser = Users.find(user => user.email === email)
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

const contra = document.getElementById('submit1');

contra.addEventListener('click', (e)=>{
    const usuario = JSON.parse(localStorage.getItem('USUARIO'));
    let p1 = document.getElementById("password").value;
    if(validarpassword()){
        const Users = JSON.parse(localStorage.getItem('users')) || []
        const validUser = Users.find(user => user.email === usuario.email)
        usuario.password=p1;
        localStorage.removeItem('users')
        let indiceAEliminar =  Users.indexOf(validUser);
        Users.splice(indiceAEliminar,1);
        Users.push(usuario);
        localStorage.setItem('users', JSON.stringify(Users))
        localStorage.removeItem('USUARIO');
        mostrarAlerta();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2500);
    }
})



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