"use strict";

let inputID = document.getElementById("txt-id");
let inputName = document.getElementById("txt-nombre");
let inputLast1 = document.getElementById("txt-lastname1");
let inputLast2 = document.getElementById("txt-lastname2");
let inputEmail = document.getElementById("txt-email");
let inputPass = document.getElementById("txt-pass");
let inputNewPass = document.getElementById("txt-new-pass");
let inputConfirmNewPass = document.getElementById("txt-new-pass-confirm");
let inputNumber = document.getElementById("txt-number");
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

  inputID.value = persona.personaDB.Identificacion;
  inputName.value = persona.personaDB.Nombre;
  inputLast1.value = persona.personaDB.Apellido1;
  inputLast2.value = persona.personaDB.Apellido2;
  inputEmail.value = persona.personaDB.Email;
  inputPass.value = persona.personaDB.Password;
  inputNumber.value = persona.personaDB.Telefono;
  inputRol.value = persona.personaDB.Rol;

  let date = new Date(persona.personaDB.Nacimiento);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dateStr = year + "-" + month + "-" + day;
  inputBirthday.value = dateStr;
}

function EditProfile() {
  EnableButtons();
}
