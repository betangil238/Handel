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
        window.location.href= 'vistaPrevia.html';
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


