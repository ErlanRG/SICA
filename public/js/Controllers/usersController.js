"use strict";

let txtIDType = document.getElementById("txtIDType");
let txtIDNumber = document.getElementById("txtID");
let txtAddName = document.getElementById("txtAddName");
let txtLastname1 = document.getElementById("txtLastname1");
let txtLastname2 = document.getElementById("txtLastname2");
let txtBirthdate = document.getElementById("txtBirthdate");
let txtEmail = document.getElementById("txtEmail");
let rolSelect = document.getElementById("rol-dropdown");
let inputProfileImg = document.getElementById("profilePic");

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

function ValidateDate(pDate) {
  let regex = /^\d{4}-\d{2}-\d{2}$/;
  let date = new Date(pDate);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!regex.test(pDate)) {
    PrintError("Formato invalido de fecha");
    return false;
  }

  if (isNaN(date.getTime())) {
    PrintError("Fecha invalida");
    return false;
  }

  if (date >= today) {
    PrintError("La fecha no puede ser igual o mayor que hoy");
    return false;
  }

  return true;
}

function ValidateIDNumber(pIDNumber) {
  let regex = /^[1-9]\d{8}$/;

  if (!regex.test(pIDNumber)) {
    PrintError("El formato de identificacion no es valido");
    return false;
  }

  return true;
}

function AddUser() {
  let idType = txtIDType.value;
  let idNumber = txtIDNumber.value;
  let name = txtAddName.value;
  let last1 = txtLastname1.value;
  let last2 = txtLastname2.value;
  let birthdate = txtBirthdate.value;
  let rol = rolSelect.value;

  if (!idType || idType == "") {
    PrintError("Debe agregar el tipo de identificacion");
    return;
  }

  if (ValidateIDNumber(idNumber) == false) {
    return;
  }

  if (!name || name == "") {
    PrintError("Debe agregar el nombre del usuario");
    return;
  }

  if (!last1 || last1 == "") {
    PrintError("Debe agregar el primer apellido del usuario");
    return;
  }

  if (!last2 || last2 == "") {
    PrintError("Debe agregar el segundo apellido del usuario");
    return;
  }

  if (ValidateDate(birthdate) == false) {
    return;
  }

  if (!rol || rol == "") {
    PrintError("Debe seleccionar el rol del usuario");
    return;
  }

  if (ValidateEmail(txtEmail) == false) {
    return;
  }

  // TODO: use the CRUD functions to add users
  PrintSuccess("Usuario registrado");
  closePopup();
}

function DeleteUsers() {
  // TODO
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
