"use strict";

let inputSede = document.getElementById("txtSede");
let inputNomActivo = document.getElementById("txtNomActivo");
let inputUbicActivo = document.getElementById("txtUbActivo");
let inputIDActivo = document.getElementById("txtIdActivo");
let inputDescrip = document.getElementById("txtDescription");

// TODO: el ID del activo es autogenerado y no es ingresado por el ususario
// De momento se mantiene asi para ambiente de prueba
function ValidateIDActivo(pIDActivo) {
  let regex = /^\d{6}$/;

  if (!pIDActivo || pIDActivo == "") {
    PrintError("Debe ingresar el ID del activo.");
    return false;
  }

  if (!regex.test(pIDActivo)) {
    PrintError("El formato del ID del activo no es valido.");
    return false;
  }

  return true;
}

function ValidateInfo(pSede, pNombre, pUbicacion, pDescripcion) {
  if (!pSede || pSede == "") {
    PrintError("Debe ingresar la sede en donde desea registrar el activo.");
    return false;
  }

  if (!pNombre || pNombre == "") {
    PrintError("Debe ingresar el nombre del activo.");
    return false;
  }

  if (!pUbicacion || pUbicacion == "") {
    PrintError("Debe ingresar la ubicacion del activo.");
    return false;
  }

  if (!pDescripcion || pDescripcion == "") {
    PrintError("Debe ingresar la descripcion del activo.");
    return false;
  }
}

function RegistrarActivo() {
  let sede = inputSede.value;
  let nombreActivo = inputNomActivo.value;
  let ubicacionActivo = inputUbicActivo.value;
  let idActivo = inputIDActivo.value;
  let descripcion = inputDescrip.value;

  if (
    ValidateInfo(sede, nombreActivo, ubicacionActivo, descripcion) == false ||
    ValidateIDActivo(idActivo) == false
  ) {
    return;
  }

  PrintSuccess("Yeah");
}
