const inputMessage = document.querySelector(".inputMessage");
const containerInput = document.querySelector(".containerAllMessages");
const sendButton = document.querySelector(".sendButtonClick");


// Función para obtener la hora actual en formato HH:MM
function obtenerHoraActual() {
  const fecha = new Date();
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
}

// Evento para manejar el clic en el botón de enviar
sendButton.addEventListener("click", function() {
  const message = inputMessage.value;

  if (message) {
    const horaActual = obtenerHoraActual();
    containerInput.innerHTML += `
      <div class="greyMessages">
        <div class="messageSent">
          <p>${message}<span class="hora">${horaActual}</span></p>
        </div>
      </div>`;
    inputMessage.value = "";
  }
});

// Evento para manejar la tecla Enter en el input
inputMessage.addEventListener("keydown", function(e) {
  if (e.key === 'Enter' && inputMessage.value) {
    const message = inputMessage.value;
    const horaActual = obtenerHoraActual();
    containerInput.innerHTML += `
      <div class="greyMessages">
        <div class="messageSent">
          <p>${message}<span class="hora">${horaActual}</span></p>
        </div>
      </div>`;
    inputMessage.value = "";
  }
});

const contenedorEmoji=document.querySelector(".emoji-container");
const botonEmoji=document.querySelector(".bxs-happy-alt");


// Agrega un evento de clic al botón de emoji
botonEmoji.addEventListener("click", function () {
  if (getComputedStyle(contenedorEmoji).display === 'none') {
    contenedorEmoji.style.display = "flex";
  } else {
    contenedorEmoji.style.display = "none";
  }
});

// Obtiene todos los elementos emoji dentro del contenedor emoji
const emojis = contenedorEmoji.querySelectorAll(".emoji");

// Agrega un evento de clic a cada emoji
emojis.forEach((emoji) => {
  emoji.addEventListener("click", function () {
    // Obtiene el emoji del elemento actual
    const emojiSeleccionado = emoji.textContent;
    // Agrega el emoji al valor del input
    inputMessage.value += emojiSeleccionado;
    // Oculta el contenedor de emojis
    contenedorEmoji.style.display = "none";
  });
});


const chatIndividual = document.querySelectorAll(".chatIndividual");
const contenedor2 = document.querySelector(".container2");
const contenedor1 = document.querySelector(".container1");
const contenedorInicial = document.querySelector(".conteinerInicial");

const chatNameUser = document.querySelector(".userNameChat");
chatIndividual.forEach((chat) =>{
  chat.addEventListener("click", function(){
    const nameUser = chat.querySelector(".chatUserName").textContent;
    chatNameUser.innerHTML = `<h4 class="nombreUsuario">${nameUser}</h4>`;
    if(window.screen.width <= 500){
      contenedor1.style.display = "none";
      contenedorInicial.style.display = "none";
      contenedor2.style.display = "flex";
    }else{
      contenedorInicial.style.display = "none";
      contenedor2.style.display = "flex";
    }

  });
});


const flecha = document.querySelector(".bx-arrow-back");
flecha.addEventListener("click", function(){
  if(window.screen.width <= 500){
    contenedor1.style.display = "block";
    contenedorInicial.style.display = "none";
    contenedor2.style.display = "none";
  }else{
    contenedorInicial.style.display = "flex";
    contenedor2.style.display = "none";
  }
  contenedorEmoji.style.display = "none";
})