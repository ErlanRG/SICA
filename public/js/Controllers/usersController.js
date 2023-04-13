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

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function ValidateDate(pDate) {
  if (!pDate || pDate == "") {
    PrintError("Debe ingresar la fecha de nacimiento");
    return false;
  }

  // Calcula la edad restando el año actual con el año ingresado
  // También comprueba si el mes de nacimiento es mayor que el mes actual o si el
  // mes de nacimiento es el mismo que el mes actual pero el día de nacimiento es
  // mayor que el día actual.
  // Si alguna de estas condiciones se cumple, significa que el usuario aún no ha
  // cumplido años este año, por lo que su edad se reduce en 1
  let birthdate = new Date(pDate);
  let age = today.getFullYear() - birthdate.getFullYear();
  let month = today.getMonth() - birthdate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  if (age < 18) {
    PrintError("La edad del usuario debe ser mayor a 18 años");
    return false;
  }

  return true;
}

function ValidateIDNumber(pIDType, pIDNumber) {
  let regex = /^[1-9]\d{8}$/;

  if (!pIDType || pIDType == "") {
    PrintError("Debe ingresar el tipo identificacion");
    return false;
  }

  if (!regex.test(pIDNumber)) {
    PrintError("El formato de identificacion no es valido");
    return false;
  }

  return true;
}

function ValidateInfo(pName, pLast1, pRol) {
  if (!pName || pName == "") {
    PrintError("Debe ingreasar el nombre del usuario");
    return false;
  }

  if (!pLast1 || pLast1 == "") {
    PrintError("Debe ingreasar el primer apellido del usuario");
    return false;
  }

  if (!pRol || pRol == "") {
    PrintError("Debe ingreasar el rol del usuario");
    return false;
  }

  return true;
}

function GenerateTempPass() {
  let length = 5,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    tempPass = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    tempPass += charset.charAt(Math.floor(Math.random() * n));
  }
  return tempPass;
}

function AddUser() {
  let idType = txtIDType.value;
  let idNumber = txtIDNumber.value;
  let name = txtAddName.value;
  let last1 = txtLastname1.value;
  let last2 = txtLastname2.value;
  let birthdate = txtBirthdate.value;
  let email = txtEmail.value;
  let rol = rolSelect.value;

  if (
    ValidateIDNumber(idType, idNumber) == false ||
    ValidateInfo(name, last1, rol) == false ||
    ValidateDate(birthdate) == false ||
    ValidateEmail(txtEmail) == false
    //TODO: Validar imagenes subidas
  ) {
    return;
  }

  let data = {
    TipoIdentificacion: idType,
    Identificacion: idNumber,
    Nombre: name,
    Apellido1: last1,
    Apellido2: last2,
    Nacimiento: birthdate,
    Estado: 1,
    Email: email,
    Password: GenerateTempPass(),
    Rol: rol,
    // FotoPerfil:
  };

  //TODO: enviar data a funcion de agregar usuario
  // let result

  console.log(data);
  PrintSuccess("Usuario registrado");
  closePopup();
}

function DeleteUsers() {
  // TODO
}
