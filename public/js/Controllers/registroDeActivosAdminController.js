"use strict";

let inputSede = document.getElementById("txtSede");
let inputNomActivo = document.getElementById("txtNomActivo");
let inputUbicActivo = document.getElementById("txtUbActivo");
let inputDescrip = document.getElementById("txtDescription");

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

async function RegistrarActivo() {
  let nombreActivo = inputNomActivo.value;
  let sedeActivo = inputSede.value;
  let ubicacionActivo = inputUbicActivo.value;
  let descripcion = inputDescrip.value;

  if (
    ValidateInfo(sedeActivo, nombreActivo, ubicacionActivo, descripcion) ==
    false
  ) {
    return;
  }

  let result = null;
  let data = {
    Nombre: nombreActivo,
    Descripcion: descripcion,
    Unidad: sedeActivo,
    Ubicacion: ubicacionActivo,
    CodigoUbic: "1234",
  };

  result = await ProcessPOST("RegistrarActivo", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado");
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    PrintSuccess("Excelente").then((res) => {
      location.href = "estadoDeRegistro.html";
    });
  }
}
