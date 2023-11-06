async function consultarUsuario1(link){
  const res = await fetch(link);
  const data = await res.json();
  return data;
}

const user1= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user1.email;


const obtenerDatos1 = async () => {
  data = await consultarUsuario1(consultaEmail1);
};

obtenerDatos1().then(() => {
  console.log(data);
  console.log(data.mensajes);
})













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
      chat.style.backgroundColor = "#343434";
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
    chatIndividual.forEach((chat) =>{
      chat.style.backgroundColor  = "#000";
    })
  }
  contenedorEmoji.style.display = "none";
})


//Funcionalidad de enviar imagen
let contador = 0; // Declaración e inicialización del contador

document.addEventListener("DOMContentLoaded", function () {
    const imgButton = document.getElementById("imgButton");

    imgButton.addEventListener("click", function () {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*"; // Limita la selección solo a imágenes
        fileInput.style.display = "none"; // Oculta el elemento de entrada

        fileInput.addEventListener("change", function () {
            const selectedImage = fileInput.files[0];
            if (selectedImage) {
                const imageElement = document.createElement("img");
                imageElement.src = URL.createObjectURL(selectedImage);
                imageElement.className = `chat-image${contador}`;

                const horaActual = obtenerHoraActual();
                // Crear el elemento del mensaje con una clase única
                const greyMessagesSent = document.createElement("div");
                greyMessagesSent.className = `greyMessages`;
                const messageSentElement = document.createElement("div");
                messageSentElement.className = `messageSent ${contador}`;

                // Agregar el contenido del mensaje
                messageSentElement.innerHTML = `
                    <p><span class="hora">${horaActual}</span></p>`;
                messageSentElement.appendChild(imageElement);

                messageSentElement.style.flexDirection = "column-reverse";
                // Agregar el mensaje al contenedor de mensajes
                greyMessagesSent.appendChild(messageSentElement);
                containerInput.appendChild(greyMessagesSent);

                // Limpia el input de archivos
                fileInput.value = null;
                contador++;
            }
        });

        // Dispara el selector de archivos
        fileInput.click();
    });
});


