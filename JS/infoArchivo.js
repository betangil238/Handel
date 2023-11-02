function base64ToBlob(base64, contentType) {
    const binaryStr = window.atob(base64);
    const binaryArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        binaryArray[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([binaryArray], { type: contentType });
}

const foto = localStorage.getItem("Objeto")
const blob = base64ToBlob(foto, "image/jpeg"); // Asegúrate de especificar el tipo de contenido correcto
const urlDeObjeto = URL.createObjectURL(blob);
const imagen = document.querySelector(".imagen");
imagen.src = urlDeObjeto;



const siguiente=document.getElementById("siguiente");
siguiente.addEventListener("click",function(){
    const titulo=document.getElementById("titulo").value;
    const descripcion=document.getElementById("descripcion").value;
    if(titulo=="" && descripcion==""){
        mostrarAlertaRechazo("Diligencie todos los campos");
    }else if(titulo==""){
        mostrarAlertaRechazo("Diligencie el campo de titulo");
    }else if(descripcion==""){
        mostrarAlertaRechazo("Diligencie el campo de descripcion");
    }
    else{
        // Obtén todos los elementos de radio con el atributo name="elegir"
        const radio = document.getElementById("radioTrueque");
           if(radio.checked){
               window.location.href='vistaPreviaTrueques.html';
           }else{
               window.location.href= 'vistaPreviaSubastas.html';
           }  
    }
})


let etiquetas =[];
const input = document.getElementById("etiquetaInput");
const listadoEtiquetas = document.querySelector(".listadoEtiquetas");
input.addEventListener("keydown",function(e){
    if(e.key === 'Enter' && input.value!=""){
        if(etiquetas.length>3){
            
            setTimeout(() => {
                mostrarAlertaRechazo("No se admiten mas etiquetas")
            }, 100);
        }else{
            const etiqueta = (input.value).toLowerCase();
            let contador =0;
            etiquetas.forEach(element => {
                if(element==etiqueta){
                    contador++;
                }
            });
            if(contador>0){
                setTimeout(() => {
                    mostrarAlertaRechazo("Esta etiqueta ya existe")
                }, 100);
                
            }else{
                etiquetas.push(etiqueta)
                const span = document.createElement("span");
                span.textContent = etiqueta[0].toUpperCase()+etiqueta.substring(1);
                input.value=""
                span.innerHTML+=`<i class='bx bx-x' id="${etiqueta}"></i>`
                listadoEtiquetas.appendChild(span);
            } 
        }
    }
})

listadoEtiquetas.addEventListener("click", function(e) {
    if (e.target.classList.contains("bx-x")) {
      // Verificar si se hizo clic en el icono (clase "bx-x")
      const etiquetaEliminada = e.target.id; // Obtener el ID del icono (que contiene el nombre de la etiqueta)
      // Eliminar la etiqueta del array
      const indice = etiquetas.indexOf(etiquetaEliminada);
      if (indice !== -1) {
        etiquetas.splice(indice, 1);
      }
      // Eliminar la etiqueta del HTML
      const spanAEliminar = e.target.parentElement; // Obtener el elemento <span> padre del icono
      listadoEtiquetas.removeChild(spanAEliminar);
    }
  });


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
