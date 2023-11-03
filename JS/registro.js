//Verificación del input name
const nombre = document.getElementById("name");
const rutaPost= "https://handelrailway-production.up.railway.app/usuario"

nombre.addEventListener("input", function () {
    //Verificar si el valor del input contiene números
    
    if (/\d/.test(nombre.value)) {
        mostrarAlertaRechazo("No se admiten numeros en el nombre");
        //Si contiene números, mostrar un mensaje de error
        //alert("No se permiten números en el texto.") ;
        nombre.value = nombre.value.replace(/\d/g, ""); // Eliminar los números
    } 
});

async function buscarUsuario(url){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function guardarUsuario(usuario){
    const res = await fetch(rutaPost,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: usuario.name,
        name2: usuario.name2,
        email: usuario.email,
        contrasena: usuario.contrasena,
        usuario: usuario.usuario,
        usuario1:usuario.usuario
        }),
    });
}

// Inicializamos una variable que recibirá los datos del formulario de registro
const signupForm = document.querySelector('#signupForm')

// Inicializamos una función que nos permitirá envíar los datos del formulario
signupForm.addEventListener('submit', async (e) => {
    //  Nos ayuda a evitar que se envíe datos sin dar click al botón
    e.preventDefault()
    // Inicializamos una variable que almacenará el valor ingresado en el campo del nombre
    const name = document.querySelector('#name').value
    // Inicializamos una variable que almacenará el valor ingresado en el campo del email
    const email = document.querySelector('#email').value
    // Inicializamos una variable que almacenará el valor ingresado en el campo de password
    const password = document.querySelector('#password').value
    if(validarpassword() && validarUsuario() && validarCorreo() ){
    
        // POST FETCH PARA GUARDAR UN USUARIO
        const consultaEmail="https://handelrailway-production.up.railway.app/usuario/validacion/"+email;
        const data = await buscarUsuario(consultaEmail);
        if(data==null){
            const Users = JSON.parse(localStorage.getItem('users')) || []
            const Configuracion = JSON.parse(localStorage.getItem('configuracion')) || []
            // Aquí especificamos que nos agregue los datos a la lista
            Users.push({name: name, email: email, password: password})
            const usercadena= cadena();
            Configuracion.push({name: name, name2:"",email: email,reset:0,usuario:usercadena,usuario1:""})
            // Aquí especificamos que nos permita recibir los datos en formato String para podernos loguear
            localStorage.setItem('users', JSON.stringify(Users))
            localStorage.setItem('configuracion', JSON.stringify(Configuracion))
            // Aquí especificamos de que si el registro fue correcto, entonces nos aparecerá un msj de alerta de que fue exitoso
            // alert('Registro Exitoso!')
            
            guardarUsuario({name:`${name}`,name2:`${name}`, email:`${email}`,contrasena:`${password}`,usuario:`${usercadena}`});
            mostrarAlerta();
            signupForm.reset();
            // Si el registro fue exitoso, nos redigirá al login luego de 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2500);
        }else{
            mostrarAlertaRechazo(`El usuario ya esta registrado!`);
        }  
    }
})

    
// Funcion que genera un usuario aleatorio
function cadena() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '@';
  
    for (let i = 0; i < 7; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      cadenaAleatoria += caracteres.charAt(indiceAleatorio);
    }
  
    return cadenaAleatoria;
  }

// VERIFICACION CONTRASEÑAS REGISTRO EN HANDEL
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

// FUNCION VALIDAR CORREO
function validarCorreo(){
    const email = document.querySelector('#email');
    const expresionRegularCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //Validar el correo electrónico con la expresión regular
    if (!expresionRegularCorreo.test(email.value)) {
        mostrarAlertaRechazo("Ingrese una dirección de correo en este formato: example@email.com");
        return false;
    }else{
        return true;
    }
}

// FUNCION QUE VALIDA SI EL USUARIO YA ESTA CREADO
function validarUsuario(){
     // Inicializamos una variable que almacenará el valor ingresado en el campo del email
    const email = document.querySelector('#email').value
    // Inicializamos una variable que recibirá los datos de los usuarios registrados, si no hay datos almacenados, se creará un arreglo vacío
    const Users = JSON.parse(localStorage.getItem('users')) || []
    // Inicializamosuna variable que buscará si el email que ingresamos es exactamente igual al que registramos
    // El método .find se encarga de buscar un elemento en la lista de objetos
     const isUserRegistered = Users.find(user => user.email === email)
     if(isUserRegistered) {
        mostrarAlertaRechazo(`El usuario ya esta registrado!`);
        return false;
    }else{
        return true;
    }
}

function mostrarAlerta() {
    Swal.fire({
        title: 'Registro',
        text: 'Exitoso',
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

