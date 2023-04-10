"use strict";

let txtName = document.getElementById("txtName");
let txtIdAsset = document.getElementById("txtIdAsset");
let txtCode = document.getElementById("txtCode");
let radioBtns = document.getElementsByName("rbtReason");
let txtCampus = document.getElementById("txtCampus");
let txtDescription = document.getElementById("txtDescription");

function UploadImages() {
  const imageBoxes = document.querySelectorAll(".image-box");

  imageBoxes.forEach((imageBox, index) => {
    const input = imageBox.querySelector(`#file${index + 1}`);
    const img = imageBox.querySelector(`#image${index + 1}`);

    imageBox.addEventListener("click", () => {
      input.click();

      input.addEventListener("change", () => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          img.src = reader.result;
        };

        reader.readAsDataURL(file);
      });
    });
  });
}

function ValidarRadioBtns() {
  let seleccion = null;
  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      seleccion = radioBtns[i].value;
      break;
    }
  }

  if (!seleccion) {
    PrintError("Ingrese razón de traslado");
    return false;
  }

  return true;
}

function Validate() {
  let name = txtName.value;
  let idNum = txtIdAsset.value;
  let code = txtCode.value;
  let campus = txtCampus.value;
  let description = txtDescription.value;

  if (!name || name == "") {
    PrintError("Debe ingresar el nombre del activo");
    return;
  }

  if (!idNum || idNum == "") {
    PrintError("Debe ingresar el ID del activo");
    return;
  }

  if (!code || code == "") {
    PrintError("Debe ingresar el codigo del activo");
    return;
  }

  if (ValidarRadioBtns() == false) {
    return;
  }

  if (!campus || campus == "") {
    PrintError("Debe ingresar la sede a trasladar");
    return;
  }

  if (!description || description == "") {
    PrintError("Debe ingresar la descripción del traslado");
    return;
  }
}
