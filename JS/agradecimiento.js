const mensaje = document.getElementById("message"); 
const button = document.querySelector(".enviar");
const id = document.querySelector(".id");
const checkbox = document.querySelector("#checkbox");

let objetoNoti = {};
const linkUsuario = "https://handelrailway-production.up.railway.app/usuario";
const linkNoti = "https://handelrailway-production.up.railway.app/notificacion";

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    console.log(data);
    return data;
}

button.addEventListener("click", async function(){
    const mensajeEnviar = mensaje.value;

    if(mensajeEnviar === ""){
        alert('Debe ingresar un mensaje');
    } else {
        const data = await consultarUsuario(linkUsuario);
           let arrayid = [];
           data.forEach(e => {
            arrayid.push(e.idUsuario)
           });

        if (checkbox.checked) {
            console.log(arrayid.length);
            objetoNoti.mensaje = mensajeEnviar;
            for(let i = 0; i < arrayid.length; i++) {
                console.log(arrayid[i]);
                objetoNoti.idUsuario = arrayid[i];
                await crearNotificacion(linkNoti, objetoNoti);
            }

        } else {
            console.log(id.value);
            if(arrayid.includes(parseInt(id.value))){
                objetoNoti.mensaje = mensajeEnviar;
                objetoNoti.idUsuario = id.value;
                console.log(objetoNoti);
                await crearNotificacion(linkNoti, objetoNoti);
            }else{

            }
        }
    }
})

async function crearNotificacion(link, objeto){
    const res = await fetch(link, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objeto),
    });
    console.log(res)
}
