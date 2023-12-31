function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
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

