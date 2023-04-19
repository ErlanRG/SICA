"use strict";

let mongoID = document.getElementById("mongoId");
let inputID = document.getElementById("txt-id");
let inputName = document.getElementById("txt-nombre");
let inputLast1 = document.getElementById("txt-lastname1");
let inputLast2 = document.getElementById("txt-lastname2");
let inputEmail = document.getElementById("txt-email");
let inputPass = document.getElementById("txt-pass");
let inputNewPass = document.getElementById("txt-new-pass");
let inputBirthday = document.getElementById("txt-birthday");
let inputRol = document.getElementById("txt-rol");
let btnAccept = document.getElementById("btnAccept");
let btnCancel = document.getElementById("btnCancel");

let queryString, urlParams, _id;

CargarDatos();

async function CargarDatos() {
  queryString = window.location.search;
  urlParams = new URLSearchParams(queryString);
  _id = urlParams.get("_id");

  let params = {
    _id: _id,
  };

  let persona = await ProcessGET("BuscarPersonaId", params);

  if (
    persona == null &&
    persona.resultado == false &&
    persona.personaDB == null
  ) {
    PrintError(persona.msj);
  }

  mongoID.value = persona.personaDB._id;
  inputID.value = persona.personaDB.Identificacion;
  inputName.value = persona.personaDB.Nombre;
  inputLast1.value = persona.personaDB.Apellido1;
  inputLast2.value = persona.personaDB.Apellido2;
  inputEmail.value = persona.personaDB.Email;
  inputPass.value = persona.personaDB.Password;
  inputRol.value = persona.personaDB.Rol;

  let date = new Date(persona.personaDB.Nacimiento);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dateStr = year + "-" + month + "-" + day;
  inputBirthday.value = dateStr;
}

function ValidateInfo(pName, pLast1, rol) {
  if (!pName || pName == "") {
    PrintError("El nombre no puede quedar vacío.");
    return false;
  }

  if (!pLast1 || pLast1 == "") {
    PrintError("El primer apellido no puede quedar vacío");
    return false;
  }

  if (!rol || rol == "") {
    PrintError("El rol no puede quedar vacío");
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

//TODO (erlan): Validar si la contraseña es nueva y actualizar la contraseña en db con la nueva
function ValidateNewPass(pPass, pConfirmPass) {
  if (!pPass || pPass == "") {
    PrintError("Debe ingresar una contraseña.");
    return false;
  }

  if (pPass != pConfirmPass) {
    PrintError("Las contraseñas no son iguales.");
    return false;
  }

  return true;
}

async function RegistrarDatos() {
  let _id = mongoID.value;
  let id = inputID.value;
  let name = inputName.value;
  let last1 = inputLast1.value;
  let last2 = inputLast2.value;
  let email = inputEmail.value;
  let pass = inputPass.value;
  let newPass = inputNewPass.value;
  let birthday = inputBirthday.value;
  let rol = inputRol.value;

  if (
    !ValidateInfo(name, last1, rol) ||
    !ValidateEmail(inputEmail) ||
    !ValidateIDNumber(id) ||
    !ValidateNewPass(pass, newPass) ||
    !ValidateDate(birthday)
  ) {
    return;
  }

  let result = null;
  let data = {
    _id: _id,
    TipoIdentificacion: 1,
    Identificacion: id,
    Nombre: name,
    Apellido1: last1,
    Apellido2: last2,
    Nacimiento: birthday,
    Email: email,
    Password: pass,
    Rol: rol,
    FotoPerfil: "foto",
  };

  result = await ProcessPUT("ModificarPersona", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado.");
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    PrintSuccess(result.msj);
  }
}
