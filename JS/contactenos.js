const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	asunto: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    mensaje: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
}

const nombre = document.getElementById("name");

nombre.addEventListener("input", function () {
    // Verificar si el valor del input contiene números
    if (/\d/.test(nombre.value)) {
        // Si contiene números, mostrar un mensaje de error
         alert("No se permiten números en el texto.") ;
        nombre.value = nombre.value.replace(/\d/g, ""); // Eliminar los números
    } 
});

const affair = document.getElementById("affair");

affair.addEventListener("input", function () {
    // Verificar si el valor del input contiene números
    if (/\d/.test(affair.value)) {
        // Si contiene números, mostrar un mensaje de error
        alert("No se permiten números en el texto.") ;
        affair.value = affair.value.replace(/\d/g, ""); // Eliminar los números
    } 
});

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

function validar(){
    const email= document.getElementById("email");
    const correoValido = /\S+@\S+\.\S+/;
    if (!correoValido.test(email.value)) {
        // Si no es válido, mostrar un mensaje de error
        alert("Ingresa una dirección de correo válida.");
        // Evitar que el formulario se envíe
        return false;
    }
    return true;
    
}
document.addEventListener('DOMContentLoaded', function(){
    let formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function() {
       formulario.reset();
    });
  });
