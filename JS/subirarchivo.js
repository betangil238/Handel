const user= JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href="login.html"  
}
var contador=0;
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      contador++;
      reader.onload = function(e) {
        var imageUploadWrap = document.querySelector('.image-upload-wrap');
        var fileUploadImage = document.querySelector('.file-upload-image');
        var fileUploadContent = document.querySelector('.file-upload-content');
        var imageTitle = document.querySelector('.image-title');
  
        imageUploadWrap.style.display = 'none';
        fileUploadImage.src = e.target.result;
        fileUploadContent.style.display = 'block';
        imageTitle.innerHTML = input.files[0].name;
      };
  
      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    contador--;
    var fileUploadInput = document.querySelector('.file-upload-input');
    var fileUploadContent = document.querySelector('.file-upload-content');
    var imageUploadWrap = document.querySelector('.image-upload-wrap');
  
    fileUploadInput.parentNode.replaceChild(fileUploadInput.cloneNode(true), fileUploadInput);
    fileUploadContent.style.display = 'none';
    imageUploadWrap.style.display = 'block';
  }
  
  var imageUploadWrap = document.querySelector('.image-upload-wrap');
  imageUploadWrap.addEventListener('dragover', function () {
    imageUploadWrap.classList.add('image-dropping');
  });
  
imageUploadWrap.addEventListener('dragleave', function () {
    imageUploadWrap.classList.remove('image-dropping');
});

function validar(){
  const fileUpload = document.querySelector('.file-upload-input');
  if(fileUpload.files.length===0 ||contador<=0 ){
    mostrarAlertaRechazo("Cargue una imagen")
  }else{
    window.location.href = 'informacionArchivo.html'
  }
}

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

const logout=document.getElementById("logout")
logout.addEventListener('click',()=>{
    console.log("Entro")
    mostrarAlerta();
    localStorage.removeItem('login_success')
    setTimeout(() => {
        window.location.href='login.html';
    }, 2500);
})

function mostrarAlerta() {
    Swal.fire({
        title: 'Muchas gracias',
        text: 'Hasta pronto',
        icon: 'success', // Puedes cambiar el icono (success, error, warning, info, etc.)
        confirmButtonText: 'Aceptar', // Texto del boton
        customClass: {
            container: 'mi-alerta',
            title: 'mi-titulo',
            content: 'mi-contenido',
            confirmButton: 'mi-boton'
        }
    });
}