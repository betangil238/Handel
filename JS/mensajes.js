let objetoMensaje = {}

function base64ToBlob(base64, contentType) {
  const binaryStr = window.atob(base64);
  const binaryArray = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
      binaryArray[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([binaryArray], { type: contentType });
}

const user1= JSON.parse(localStorage.getItem('login_success')) || false
const consultaEmail1="https://handelrailway-production.up.railway.app/usuario/validacion/"+user1.email; 
const linkMensajes = "https://handelrailway-production.up.railway.app/contenido"

async function obtenerMensajes(link){
  const res = await fetch(link);
  const data = await res.json();
  const arrayId = await idUsuarios(data)
  const arrayUs = await buscarUsuarios(arrayId)
  await producirMensajes(arrayUs);
  let id
  await visibilidadChats();

}

obtenerMensajes(consultaEmail1);

async function buscarIdChat(id){
  const linkBuscarChat = "https://handelrailway-production.up.railway.app/mensaje/"+ id;
  const chat = await consultarUsuario(linkBuscarChat);
  return chat
}

async function buscarUsuarios(arrayId) {
  let arrayCompleto = [];
  for (let i = 0; i < arrayId.length; i++) {
    let arrayUsuarios = [];
    const linkusuarioTrueque = "https://handelrailway-production.up.railway.app/usuario/" + arrayId[i][0];
    const usuarioChat = await consultarUsuario(linkusuarioTrueque);
    arrayUsuarios.push(usuarioChat, arrayId[i][1]);
    arrayCompleto.push(arrayUsuarios)
  }
  console.log(arrayCompleto);
  return arrayCompleto;
}

async function consultarUsuario(link){
  const res = await fetch(link);
  const data = await res.json();
  return data;
}

async function idUsuarios(data){
  const mensaje1 = data.mensajes1
  const mensaje2 = data.mensajes2
  let idCompleto = []
  let ids = []
  mensaje1.forEach(id => {
    ids = []
    ids.push(id.idUsuario2,id.idmensajes)
    idCompleto.push(ids)
  })
  mensaje2.forEach(id => {
    ids = []
    ids.push(id.idUsuario1, id.idmensajes)
    idCompleto.push(ids)
  })
  return idCompleto;
}

const containerFotosRecientes = document.querySelector(".containerImgsReciente")
let urlPerfil
async function producirMensajes(arrayUs){
  arrayUs.forEach(us =>{
    if(us[0].imagen == null){
      urlPerfil = 'Img/perfilAlternativo.png'
    }else{
      const blob = base64ToBlob(us[0].imagen, "image/jpeg");
      urlPerfil = URL.createObjectURL(blob);
    }
    containerFotosRecientes.innerHTML += `<div class="imgNameReciente">
    <img class="fotoChatsRecientes" src="${urlPerfil}">
    <p class="nombreChatsRecientes">${us[0].name2}</p>
    </div>`
    const chatsGenerales = document.querySelector(".chatsGenerales")
    chatsGenerales.innerHTML += `<div class="chatIndividual" id="${us[1]}">
    <div class="chatIndivImg">
        <img src="${urlPerfil}">
    </div>
    <div class="chatUserNameMessage" id="ocultarContainer()">
        <h4 class="chatUserName">${us[0].name2}</h4>
        <p class="chatMessage"></span></p>
    </div>
    <div class="chatInfoChatIndividual">
        <p class="numberMessages"><span>1</span></p>
        <p>13:00</p>
    </div>
    </div>`
  })
}
  


async function visibilidadChats(){
  let id
  const chatIndividual = document.querySelectorAll(".chatIndividual");
  const contenedor2 = document.querySelector(".container2");
  const contenedor1 = document.querySelector(".container1");
  const contenedorInicial = document.querySelector(".conteinerInicial");
  const chatNameUser = document.querySelector(".userNameChat");
  chatIndividual.forEach(chat =>{;
    chat.addEventListener("click", async function(){
      const containerInput1 = document.querySelector(".containerAllMessages");
      containerInput1.textContent = ""
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
      id = chat.id;
      const infoChat = await buscarIdChat(id);
      console.log(infoChat);
      const resultado = restarHorasAFecha(infoChat.horaMensaje)
      const fecha = resultado.nuevaFecha
      const containerInput = document.querySelector(".containerAllMessages");
      containerInput.innerHTML += `<div class="fechaChat">
        <h4 class="textoFechaChat">${fecha}</h4>
        </div>`
      infoChat.mensajes.forEach(men => {
        if(men.idUsuario1 != user1.id){
          containerInput.innerHTML += `<div class="yellowMessages">
            <div class="messageReceived">
              <p>${men.mensaje}<br><span class="hora">${men.createdDate}</span></p>
            </div>
          </div>`;
        }else{
          containerInput.innerHTML += `<div class="greyMessages">
            <div class="messageSent">
              <p>${men.mensaje}<span class="hora">${men.createdDate}</span></p>
            </div>
          </div>`;
        }
      })

      const inputMessage = document.querySelector(".inputMessage");
      const sendButton = document.querySelector(".sendButtonClick");
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
          const date = new Date()
          objetoMensaje.mensaje = message
          objetoMensaje.idUsuario1 = user1.id
          objetoMensaje.idChat = id
          objetoMensaje.fechadecreacion = date
          crearMensaje(linkMensajes, objetoMensaje)
          console.log(objetoMensaje);
        }
      })
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
          const date = new Date()
          inputMessage.value = "";
          objetoMensaje.mensaje = message
          objetoMensaje.idUsuario1 = user1.id
          objetoMensaje.idChat = id
          objetoMensaje.fechadecreacion = date
          crearMensaje(linkMensajes, objetoMensaje)
          console.log(objetoMensaje);
        }
      })
      


      
    });
  });
}


async function crearMensaje(link, objeto){
  console.log(objeto);
  const res = await fetch(link, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(objeto),
  });
  console.log(res);
}

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


// Función para obtener la hora actual en formato HH:MM
function obtenerHoraActual() {
  const fecha = new Date();
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
}

// Evento para manejar el clic en el botón de enviar

// Evento para manejar la tecla Enter en el input


const contenedorEmoji=document.querySelector(".emoji-container");
const botonEmoji=document.querySelector(".bxs-happy-alt");
const chatIndividual = document.querySelectorAll(".chatIndividual");
const contenedor2 = document.querySelector(".container2");
const contenedor1 = document.querySelector(".container1");
const contenedorInicial = document.querySelector(".conteinerInicial");

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

