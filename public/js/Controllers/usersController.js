"use strict";

let txtAddName = document.getElementById("txtAddName");
let txtAddSurname = document.getElementById("txtAddSurname");
let rolSelect = document.querySelector("select");
let txtEmail = document.getElementById("txtEmail");
let superuser = document.getElementById("superuser");

let editBtn = document.getElementById("edit");
let addBtn = document.getElementById("add");
let deleteBtn = document.getElementById("delete");
let acceptBtn = document.getElementById("accept");
let cancelBtn = document.getElementById("cancel");

// To enable other buttons
editBtn.addEventListener("click", EnableButtons);
cancelBtn.addEventListener("click", DisableButtons);
addBtn.addEventListener("click", EnableAddUser);
deleteBtn.addEventListener("click", DeleteUsers);

function EnableButtons() {
  editBtn.style.display = "none";
  addBtn.style.display = "inline";
  deleteBtn.style.display = "inline";
  acceptBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

function DisableButtons() {
  editBtn.style.display = "inline";
  addBtn.style.display = "none";
  deleteBtn.style.display = "none";
  acceptBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

function EnableAddUser() {
  document.getElementById("popup").style.display = "block";
}

function AddUser() {
  let name = txtAddName.value;
  let surname = txtAddSurname.value;
  let email = txtEmail.value;
  let rol = rolSelect.value;
  let isSudo = false;

  if (!name || name == "") {
    PrintError("Debe agregar el nombre del usuario");
    return;
  }

  if (!surname || surname == "") {
    PrintError("Debe agregar el apellido del usuario");
    return;
  }

  if (!rol || rol == "") {
    PrintError("Debe seleccionar el rol del usuario");
    return;
  }

  if (!email || email == "") {
    PrintError("Debe agregar el email del usuario");
    return;
  }

  if (superuser.checked) {
    isSudo = true;
  }

  PrintSuccess("Usuario añadido");
  closePopup();
  // TODO: insertar los datos del nuevo usuario en MongoDB
}

function DeleteUsers() {
  // TODO
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
