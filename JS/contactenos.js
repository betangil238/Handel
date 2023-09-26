// Listado de expresiones regulares posibles a ser usada en cada input
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	asunto: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    mensaje: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
}
// funcion que muestra una alerta de resultado exitoso
function mostrarAlerta() {
    Swal.fire({
        title: 'Muchas gracias',
        text: 'El equipo de Handel se contactará contigo.',
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

// verificacion del input name
const nombre = document.getElementById("fname");

nombre.addEventListener("input", function () {
    // Verificar si el valor del input contiene números
    if (/\d/.test(nombre.value)) {
        mostrarAlertaRechazo("No se admiten numeros en el nombre");
        // Si contiene números, mostrar un mensaje de error
        // alert("No se permiten números en el texto.") ;
        nombre.value = nombre.value.replace(/\d/g, ""); // Eliminar los números
    } 
});

// verificacion del input asunto
const affair = document.getElementById("affair");

affair.addEventListener("input", function () {
    // Verificar si el valor del input contiene números
    if (/\d/.test(affair.value)) {
        // Si contiene números, mostrar un mensaje de error
        // alert("No se permiten números en el texto.") ;
        mostrarAlertaRechazo("No se admiten numeros en el asunto");
        affair.value = affair.value.replace(/\d/g, ""); // Eliminar los números
    } 
});

// Funcion en el text area para limitar la cantidad de caracteres
const textarea = document.getElementById("message");
const contador = document.getElementById("contador");
const limiteCaracteres = 700;

textarea.addEventListener("input", function () {
    const texto = textarea.value;
    const caracteresRestantes = limiteCaracteres - texto.length;

    if (caracteresRestantes >= 0) {
        contador.textContent = "Caracteres restantes: " + caracteresRestantes;
    } else {
        // Si se supera el límite, truncar el texto
        textarea.value = texto.slice(0, limiteCaracteres);
        contador.textContent = "Caracteres restantes: 0";
    }
});

// Funcion que valida que el formato del correo este de forma adecuada
const formulario = document.getElementById("formulario");
const botonEnviar = formulario.querySelector("button[type='submit']");
const inputCorreo = formulario.querySelector("#email");

formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    const expresionRegularCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Validar el correo electrónico con la expresión regular
    if (!expresionRegularCorreo.test(inputCorreo.value)) {
        mostrarAlertaRechazo("Ingrese una direccion de correo en este formato: example@email.com");
        // alert("El correo electrónico no es válido. Por favor, ingrese un correo válido.");
    } else {
        // Si la validación es exitosa, permite que el formulario se envíe
        mostrarAlerta();
        formulario.submit();
        formulario.reset();
    }
});





