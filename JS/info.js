const linkUser="https://handelrailway-production.up.railway.app/usuario";
await actualizarUsuario(linkUser,data);   
const linkFoto="https://handelrailway-production.up.railway.app/usuario/"+data.idUsuario+"/imagen";
const imagenBlob = await crearFoto();
await actualizarFoto(linkFoto,imagenBlob);  

async function consultarUsuario(link){
    const res = await fetch(link);
    const data = await res.json();
    return data;
}


async function buscarUsuario(link){
    const res = await fetch (link);
    const data = await res.json();
    return data
}

async function actualizarUsuario(link,usuario){
    fetch(link,{
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
}

async function actualizarFoto(link,foto){
    const formData = new FormData();
    formData.append('imagen', foto);
    fetch(link,{
        method: "PATCH",
        body: formData,
    })
}

async function crearFoto() {
    return new Promise((resolve, reject) => {
        const fileInput = document.querySelector('.file-upload-input');
        const file = fileInput.files[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const blob = new Blob([arrayBuffer], { type: file.type });
                resolve(blob);
            };
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error('Ningún archivo seleccionado.'));
        }
    });
}

// RECIBIR DATOS DE SQL

const perfil = document.querySelector(".container1imgPerfil");
const blob = base64ToBlob(data.imagen, "image/jpeg");
    const urlDeObjeto = URL.createObjectURL(blob);
    console.log(urlDeObjeto);
    perfil.src = urlDeObjeto;


function base64ToBlob(base64, contentType) {
const binaryStr = window.atob(base64);
const binaryArray = new Uint8Array(binaryStr.length);
for (let i = 0; i < binaryStr.length; i++) {
    binaryArray[i] = binaryStr.charCodeAt(i);
}
return new Blob([binaryArray], { type: contentType });
}