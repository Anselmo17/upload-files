// variables globals
const imageInput = document.getElementById("image");
const gallery = document.getElementById("gallery");
const btnSave = document.getElementById('btn-save');
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

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    imageInput.src = reader.result;
    titlePreview.innerText = "Preview da Imagem";
    preview.style.border = "5px solid rgb(0, 0, 0)";
    btnSave.style.display = "inline-block";
    preview.style.display = "block";
  });

  reader.readAsDataURL(file);
}



function uploadFile() {
  const file = document.getElementById("file").files[0];
  this.saveImageAndBase64(file);

  btnSave.style.display = "none";
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


  gallery.innerHTML = '';
  btnSave.disabled = false;
  // Criar e exibir a imagem
  imagesBase64.forEach((item, index) => {
    // create btn
    const btnDelete = document.createElement("button");
    btnDelete.id = item.id;
    btnDelete.textContent = "remover";
    btnDelete.className = "btn btn-1 btn-sep icon-send align-btn";
    btnDelete.style.display = "inline-block";

    btnDelete.addEventListener('click', function(e) {
      // Implemente aqui a lógica específica que você deseja
      const id = e.currentTarget.id;
      console.log('id selecionado', id);
      removeCard(id);
    });

    // create image
    const img = document.createElement("img");
    img.src = item.image;

    // create card
    const card = document.createElement("div");
    card.classList.add('align-card');
    card.appendChild(img);
    card.appendChild(btnDelete);

    // add galley
    gallery.appendChild(card);

    sectionGallery.style.display = "block";
  });

  clearFields();
}

function clearFields() {
  preview.style.display = "none";
  fileInput.innerHTML = "";
  fileInput.value = null;

}

function removeCard(id) {
  const list = localStorage.getItem("Images");

  let imagesFinds = null;
  list ? imagesFinds = JSON.parse(list) : [];

  const imagesFiltered = imagesFinds.filter((item) => item.id.toString() !== id);

  !imagesFiltered.length ? localStorage.removeItem("Images") : localStorage.setItem("Images", JSON.stringify(imagesFiltered));
  !imagesFiltered.length ? sectionGallery.innerHTML = "" : undefined;

  showImageSave();
}
