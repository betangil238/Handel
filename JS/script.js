// Conexion de la seccion question del HTML almacenada en la variable preguntas
const preguntas = document.querySelectorAll(".question");

// For Each que despliega la pregunta siguiente activa con su respectiva respuesta al darle click
// a su vez oculta la respuesta de la pregunta AuthenticatorAttestationResponse
preguntas.forEach((pregunta)=>{
    pregunta.addEventListener("click", ()=>{
        RemoveClassActive();
        pregunta.nextElementSibling.classList.toggle('active');
    })
})

// Funcion que oculta la respuesta a una pregunta activa luego de activar una nueva
function RemoveClassActive(){
    preguntas.forEach ((pregunta) => {
        pregunta.nextElementSibling.classList.remove("active")
    });
}

let btnContacto=document.getElementById("button_Contactenos");

// Agrega un evento click al botón para redirigir al usuario
btnContacto.addEventListener("click", function() {
    window.location.href = "contactanos.html";
});

