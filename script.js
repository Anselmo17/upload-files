// variables global
const imageInput = document.getElementById("image");
const gallery = document.getElementById("gallery");
const sectionGallery = document.querySelector(".section-gallery");
const preview = document.querySelector(".preview");
const fileInput = document.getElementById("file");
fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  readImageAsBlob(file);
}

function readImageAsBlob(file) {
  const titlePreview = document.getElementById("title-preview");
  const btnSave = document.getElementById("btn-save");

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    imageInput.src = reader.result;
    titlePreview.innerText = "Preview da Imagem";
    preview.style.border = "5px solid rgb(0, 0, 0)";
    btnSave.style.display = "inline-block";
  });

  reader.readAsDataURL(file);
}

function uploadFile() {
  const file = document.getElementById("file").files[0];
  this.saveImageAndBase64(file);
}

function saveImageAndBase64(file) {
  gallery.innerHTML = "";
  const reader = new FileReader();

  reader.onload = () => {
    const base64Image = reader.result;
    try {
      const images = JSON.parse(localStorage.getItem("Images")) || [];

      images.push({ id: Date.now(), image: base64Image });
      const ImagesFormat = JSON.stringify(images);

      localStorage.setItem("Images", ImagesFormat);
      alert("Imagem salva com sucesso!");
      this.showImageSave();
    } catch (error) {
      alert("Erro ao salvar a imagem: " + error.message);
    }
  };
  reader.readAsDataURL(file);
}

function showImageSave() {
  // Verificar se a imagem está armazenada no localStorage
  const imagesBase64 = JSON.parse(localStorage.getItem("Images"));

  if (!imagesBase64) {
    console.log("Nenhuma imagem encontrada no localStorage.");
    return;
  }

  // Criar e exibir a imagem
  imagesBase64.forEach((item, index) => {
    // create btn
    const btnDelete = document.createElement("button");
    btnDelete.id = item.id;
    btnDelete.textContent = "remover";
    btnDelete.className = "btn btn-1 btn-sep icon-send";
    btnDelete.style.display = "inline-block";

    btnDelete.addEventListener('click', function(e) {
      // Implemente aqui a lógica específica que você deseja
      const id = e.currentTarget.id;
      console.log('id selecionado', id);
      removeCard(id);
      //card.remove();
    });

    // create image
    const img = document.createElement("img");
    img.src = item.image;

    // create card
    const card = document.createElement("div");
    card.appendChild(img);
    card.appendChild(btnDelete);

    // add galley
    gallery.appendChild(card);

    sectionGallery.style.display = "block";
  });

  clearFields();
}

function clearFields() {
  preview.innerHTML = "";
  preview.style.border = "";
  fileInput.innerHTML = "";
}

function removeCard(id) {
  const list = localStorage.getItem("Images");

  let imagesFinds = null;
  list ? imagesFinds = JSON.parse(localStorage.getItem("Images")) : [];

  const imagesFiltered = imagesFinds.filter((item) => item.id === id);

  //localStorage.removeItem('Images');
  localStorage.setItem("Images", imagesFiltered);

  showImageSave();
}
