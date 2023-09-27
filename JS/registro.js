// Inicializamos una variable que recibirá los datos del formulario de registro
const signupForm = document.querySelector('#signupForm')

// Inicializamos una función que nos permitirá envíar los datos del formulario
signupForm.addEventListener('submit', (e) => 
{
    //  Nos ayuda a evitar que se envíe datos sin dar click al botón
    e.preventDefault()
    // Inicializamos una variable que almacenará el valor ingresado en el campo del nombre
    const name = document.querySelector('#name').value
    // Inicializamos una variable que almacenará el valor ingresado en el campo del email
    const email = document.querySelector('#email').value
    // Inicializamos una variable que almacenará el valor ingresado en el campo de password
    const password = document.querySelector('#password').value
    // Inicializamos una variable que recibirá los datos de los usuarios registrados, si no hay datos almacenados, se creará un arreglo vacío
    const Users = JSON.parse(localStorage.getItem('users')) || []
    // Inicializamosuna variable que buscará si el email que ingresamos es exactamente igual al que registramos
    // El método .find se encarga de buscar un elemento en la lista de objetos
    const isUserRegistered = Users.find(user => user.email === email)


    



    //Si el email que desee registrar, ya existe, nos dirá que ya se encuentra registrado, sino me permitirá ingresar sin problema al sistema
    if(isUserRegistered) {
        mostrarAlertaRechazo();
        // return alert('El usuario ya esta registrado!')
    }else{
        // Aquí especificamos que nos agregue los datos a la lista
        Users.push({name: name, email: email, password: password})

        // Aquí especificamos que nos permita recibir los datos en formato String para podernos loguear
        localStorage.setItem('users', JSON.stringify(Users))

        // Aquí especificamos de que si el registro fue correcto, entonces nos aparecerá un msj de alerta de que fue exitoso
        // alert('Registro Exitoso!')
        mostrarAlerta();

        // Si el registro fue exitoso, nos redigirá al login luego de 3 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2500);
    }

   
})

function mostrarAlerta() {
    Swal.fire({
        title: 'Registro',
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
//funcion para mostrar el mensaje durante un tiempo en ms

// funcion que muestra una alerta de error
function mostrarAlertaRechazo() {
    Swal.fire({
        title: 'Error',
        text: `El usuario ya esta registrado!`,
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