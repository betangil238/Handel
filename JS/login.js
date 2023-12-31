


const user= JSON.parse(localStorage.getItem('login_success')) || false
if (user) {
    window.location.href="pgppal.html"  
}

//Inicializamos una variable que recibirá los datos del formulario
const loginForm = document.querySelector('#loginForm')

// Inicializamos la función que nos permitirá loguerse
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const consultaEmail="https://handelrailway-production.up.railway.app/usuario/validacion/"+email;
    const data = await buscarUsuario(consultaEmail);
    if(data!=null){
        if(data.email==email && data.contrasena==password){
            // Inicializamos una variable que nos permita ingresar al sistema
                    //const Users = JSON.parse(localStorage.getItem('users')) || []
                    // // Aquí validamos si los datos son iguales a los que se registraron
                    // const validUser = Users.find(user => user.email === email && user.password === password)
                    // // Inicializamos un condicional, especificando de que si los datos son diferentes, no nos permita iniciar sesión
                    //                 // if(!validUser) {
                    //                 //     mostrarAlertaRechazo();
                    //                 //     // return alert ('Usuario y/o contraseña son incorrectos o no existen')
                    //                 // }
                    // // Pero si los datos son correctos, nos mostrará una alerta de bienvenida
                    //           // alert(`Bienvenido ${validUser.name}`)
                    // // Aquí almacenamos los datos String a JSON para que se guarden en la lista de objetos
                    // localStorage.setItem('login_success', JSON.stringify(validUser))
                    // // Si los datos son correctos, que nos redirija al home del sistema
            localStorage.setItem('login_success', JSON.stringify({"id":`${data.idUsuario}`,"email":`${data.email}`}))
            mostrarAlerta(data.name2)
  
            setTimeout(() => {
                window.location.href = 'pgppal.html';
            }, 2500);
        }else{
            mostrarAlertaRechazo();
        }
    }else{
        mostrarAlertaRechazo();
    }
    
})
async function buscarUsuario(url){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
// funcion que muestra una alerta de resultado exitoso
function mostrarAlerta(mensaje) {
    Swal.fire({
        title: 'Bienvenido',
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
// funcion que muestra una alerta de error
function mostrarAlertaRechazo() {
    Swal.fire({
        title: 'Error',
        text: `Usuario y/o contraseña son incorrectos o no existen`,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        customClass: {
            container: 'mi-alerta-error',
            title: 'mi-titulo-error',
            content: 'mi-contenido-error',
            confirmButton: 'mi-boton-error'
        }
    });
    const margen = document.querySelector("div:where(.swal2-container)");
    margen.style.padding = "30px"
}