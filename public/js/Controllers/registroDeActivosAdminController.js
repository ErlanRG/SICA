"use strict";

const COMPANY_NAME = "ProveGuard"

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
    CodigoUbic: genCodUbicacion(nombreActivo, sedeActivo, ubicacionActivo),
    Usuario: GetActiveSession().Email,
    FechaCreacion: setDate(),
  };

  result = await ProcessPOST("RegistrarActivo", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado");
  } else if (result.resultado == false) {
    PrintError(result.err);
  } else {
    PrintSuccess("Activo registrado con éxito.").then((res) => {
      location.href = "estadoDeRegistro.html";
    });
  }
}

function genCodUbicacion(pActivo, pSede, pUbic) {
  let company = COMPANY_NAME.substring(0, 3)
  let unid =  setFirstCharUpperCase(pActivo).substring(0,3)
  let sede = setFirstCharUpperCase(pSede).substring(0,3)
  let location = ''
  pUbic.split(" ").forEach(function (item) {
      if(isNaN(item)){
        location += setFirstCharUpperCase(item).substring(0,3)
      } else {
        location += Number(item)
      }
  });
  // ComUniSedLoc13
  return company + unid + sede + location
}

function setDate() {
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);
  return dateString;
}

function setFirstCharUpperCase(value){
  value = value.toLowerCase()
  let firstChar = value.charAt(0) 
  return value.replace(firstChar, firstChar.toUpperCase()) 
}