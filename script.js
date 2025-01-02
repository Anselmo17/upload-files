

const fileInput = document.getElementById('file');
fileInput.addEventListener('change', handleFileSelect);


const imageInput = document.getElementById('image');

function handleFileSelect(event) {
  const file = event.target.files[0];
  readImageAsBlob(file)
}

function readImageAsBlob(file) {

    const titlePreview = document.getElementById('title-preview');
    const preview = document.querySelector('.preview');
    const reader = new FileReader();
    
    reader.addEventListener('load', function() {
      imageInput.src = reader.result;
      titlePreview.innerText = 'Preview da Imagem';
      preview.style.border = '5px solid rgb(0, 0, 0)';
    });
    
    reader.readAsDataURL(file);
  }


function uploadFile() {
    const file = document.getElementById('file').files[0];
    
    console.log('--------- file -------------', file);
    const formData = new FormData();
    formData.append('file', file);
  
    console.log('--------- formData -------------', formData);
  }