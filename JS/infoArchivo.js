
const foto = localStorage.getItem("FotoObjeto")
if(foto){
    const imagen = document.querySelector(".imagen");
    imagen.src = foto;
}else{
    window.location.href = 'subirarchivo.html';
}

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
          const categoria = document.getElementById("cate")
          const catSeleccionada = categoria.value
          const visibi= document.getElementById("cate1")
          const visibilidad = visibi.value
          localStorage.setItem('ObjetoInfo', JSON.stringify({"titulo":`${titulo}`,"descripcion":`${descripcion}`,"etiquetas":`${etiquetas}`,"categoria":`${catSeleccionada}`,"visibilidad":`${visibilidad}`}))
          const radio = document.getElementById("radioTrueque");
             if(radio.checked){
                 window.location.href='vistaPreviaTrueques.html';
             }else{
                 window.location.href= 'vistaPreviaSubastas.html';
             }  
      }
  })


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
