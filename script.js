const fileInput = document.getElementById("file");
fileInput.addEventListener("change", handleFileSelect);

const imageInput = document.getElementById("image");

function handleFileSelect(event) {
  const file = event.target.files[0];
  readImageAsBlob(file);
}

function readImageAsBlob(file) {
  const titlePreview = document.getElementById("title-preview");
  const preview = document.querySelector(".preview");
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    imageInput.src = reader.result;
    titlePreview.innerText = "Preview da Imagem";
    preview.style.border = "5px solid rgb(0, 0, 0)";
  });

  reader.readAsDataURL(file);
}

function uploadFile() {
  const file = document.getElementById("file").files[0];
 this.saveImageAndBase64(file);
}


function saveImageAndBase64(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result; //.split(',')[1];
        try {
          const images = JSON.parse(localStorage.getItem('Images')) || [];

          images.push({ image: base64Image });
          const ImagesFormat = JSON.stringify(images);

          localStorage.setItem('Images', ImagesFormat);
          alert('Imagem salva com sucesso!');
          this.showImageSave();
        } catch (error) {
          alert('Erro ao salvar a imagem: ' + error.message);
        }
      };
      reader.readAsDataURL(file);
}


function showImageSave() {
  // Verificar se a imagem está armazenada no localStorage
  const imagesBase64 = JSON.parse(localStorage.getItem('Images'));
  
  if (!imagesBase64) {
    console.log("Nenhuma imagem encontrada no localStorage.");
    return;
  }
  
  // Criar e exibir a imagem
  let templateImages = '';
  
  imagesBase64.forEach(item => {
    const img = document.createElement('img');
    img.src = item.image;
   templateImages += img;
  });

  document.getElementById('card').appendChild(templateImages);
}