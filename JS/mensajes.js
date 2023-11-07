async function consultarDato(link){
  const res = await fetch(link);
  const data = await res.json();
  return data;
}

const user1= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user1.email; 


const obtenerDatos1 = async () => {
  data = await consultarDato(consultaEmail1);
  const mensajesRecibidos = data.mensajes2
  const linkusuarioTrueque="https://handelrailway-production.up.railway.app/usuario/"+mensajesRecibidos[0].idUsuario1
  usuarioReceptor = await consultarDato(linkusuarioTrueque)
};

obtenerDatos1().then(() => {
  console.log(data);
  const containerFotosRecientes = document.querySelector(".containerImgsReciente")
  const mensajesRe = data.mensajes2
  const mensajesRecibidos = mensajesRe[(mensajesRe.length)-1]
  const blob = base64ToBlob(usuarioReceptor.imagen, "image/jpeg");
  const urlDeObjeto = URL.createObjectURL(blob);
  containerFotosRecientes.innerHTML += `<div class="imgNameReciente">
  <img class="fotoChatsRecientes" src="${urlDeObjeto}">
  <p class="nombreChatsRecientes">${usuarioReceptor.name2}</p>
  </div>`
  const chatsGenerales = document.querySelector(".chatsGenerales")
  chatsGenerales.innerHTML += `<div class="chatIndividual">
  <div class="chatIndivImg">
      <img src="${urlDeObjeto}">
  </div>
  <div class="chatUserNameMessage" id="ocultarContainer()">
      <h4 class="chatUserName">${usuarioReceptor.name2}</h4>
      <p class="chatMessage">${mensajesRecibidos.mensaje}</span></p>
  </div>
  <div class="chatInfoChatIndividual">
      <p class="numberMessages"><span>1</span></p>
      <p>13:00</p>
  </div>
  </div>`

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
      const fecha = document.querySelector(".textoFechaChat")
      const mensRecibido = document.querySelector(".messageReceived")
      const mensEnviado = document.querySelector(".messageSent")
      const horaMensajes1 = document.querySelector(".horaInicial1")
      const horaMensajes2 = document.querySelector(".horaInicial2")
      const fechaBD = mensajesRe[0].horaMensaje
      const mensajeReciBD =  mensajesRe[0].mensaje
      const mensajeEnviBD =  data.mensajes1[0].mensaje
      const resultado = restarHorasAFecha(fechaBD)
      fecha.textContent = resultado.nuevaFecha
      mensEnviado.innerHTML = `<p>${mensajeEnviBD}<span class="hora">${resultado.nuevaHora}</span></p>`
      mensRecibido.innerHTML = `<p>${mensajeReciBD}<br><span class="hora">${resultado.nuevaHora}</span></p>`
    });
  });


})

function restarHorasAFecha(fechaHora) {
  // Divide la fecha y hora
  const [fecha, hora] = fechaHora.split('T');

  // Divide la fecha en partes (año, mes y día)
  const partesFecha = fecha.split('-');
  const ano = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10);
  let dia = parseInt(partesFecha[2], 10);

  // Divide la hora en partes (horas, minutos y segundos)
  const partesHora = hora.split(':');
  let horas = parseInt(partesHora[0], 10);
  const minutos = parseInt(partesHora[1], 10);
  const segundos = parseInt(partesHora[2], 10);

  // Resta 5 horas a las horas actuales
  horas -= 5;

  // Ajusta las horas y el día si son negativos
  if (horas < 0) {
    horas = 24 + horas;
    dia -= 1;
    if (dia < 1) {
      // Ajusta el mes y el año si el día es menor que 1
      mes -= 1;
      if (mes < 1) {
        ano -= 1;
        mes = 12;
      }
      // Determina el último día del mes ajustado
      const ultimoDiaDelMes = new Date(ano, mes, 0).getDate();
      dia = ultimoDiaDelMes;
    }
  }

  // Formatea la nueva fecha en el formato "YYYY-MM-DD"
  const nuevaFecha = `${ano}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

  // Formatea la nueva hora en el formato "HH:MM:SS"
  const nuevaHora = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;

  return { nuevaFecha, nuevaHora };
}






function base64ToBlob(base64, contentType) {
  const binaryStr = window.atob(base64);
  const binaryArray = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
      binaryArray[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([binaryArray], { type: contentType });
}






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


