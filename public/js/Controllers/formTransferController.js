"use strict";

let inputIDActivo = document.getElementById("txtIdAsset");
let inputNombre = document.getElementById("txtName");
let inputActivoCode = document.getElementById("txtCode");
let rbtReasons = document.getElementsByName("rbtReason");
let inputOtros = document.getElementById("txtOtro");
let inputSede = document.getElementById("txtCampus");
let inputDescription = document.getElementById("txtDescription");
let inputImg1 = document.getElementById("image1");
let inputImg2 = document.getElementById("image2");

// Carga automaticamente la informacion del activo basado en el ID_activo
inputIDActivo.addEventListener("blur", async () => {
  let idActivo = inputIDActivo.value;

  let params = {
    ID_activo: idActivo,
  };

  let activo = await ProcessGET("BuscarActivosIdentificacion", params);

  if (activo.activoDB == null) {
    inputNombre.value = "";
    inputActivoCode.value = "";
    PrintError("No se ha encontrado ningun activo con ese ID.");
  } else {
    inputNombre.value = activo.activoDB.Nombre;
    inputActivoCode.value = activo.activoDB.CodigoUbic;
    inputDescription.value = activo.activoDB.Descripcion;
  }
});

function ValidateData(pID, pNombre, pCod, pReason, pSede, pImg1, pImg2) {
  if (pID == "") {
    PrintError("Debe ingresar el ID del activo.");
    return false;
  }

  if (pNombre == "") {
    PrintError("Debe ingresar el nombre del activo.");
    return false;
  }

  if (pCod == "") {
    PrintError("Debe ingresar el codigo del activo.");
    return false;
  }

  if (pReason == "") {
    PrintError("Debe ingresar la razón del traslado.");
    return false;
  }

  if (pSede == "") {
    PrintError("Debe ingresar la sede a trasladar.");
    return false;
  }

  if (pImg1 == "" || pImg2 == "") {
    PrintError("Debe ingresar dos fotos como mínimo del activo.");
    return false;
  }

  return true;
}

function ValidateRbt() {
  let isSelected = false;

  for (let i = 0; i < rbtReasons.length; i++) {
    if (rbtReasons[i].checked) {
      isSelected = true;
      break;
    }
  }

  if (!isSelected) {
    PrintError("Debe seleccionar la razón del traslado.");
    return false;
  }

  return true;
}

async function Trasladar() {
  let idActivo = inputIDActivo.value;
  let nombreActivo = inputNombre.value;
  let codActivo = inputActivoCode.value;
  let sede = inputSede.value;
  let razonTraslado = getReason();
  let img1 = inputImg1.getAttribute("src");
  let img2 = inputImg2.getAttribute("src");

  if (
    !ValidateData(
      idActivo,
      nombreActivo,
      codActivo,
      razonTraslado,
      sede,
      img1,
      img2
    ) ||
    !ValidateRbt()
  ) {
    return;
  }

  let data = {
    ActivoAfectado: idActivo,
    Razon: razonTraslado,
    Imagen1: img1,
    Imagen2: img2,
  };

  let result = await ProcessPOST("RegistrarTraslado", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado");
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    PrintSuccess("Traslado solicitado.").then((res) => {
      location.href = "estadoTrasladoAdmin.html";
    });
  }
}

function getReason() {
  let selectedReason = "";
  for (let i = 0; i < rbtReasons.length; i++) {
    if (rbtReasons[i].checked) {
      selectedReason = rbtReasons[i].value;
      break;
    }
  }
  if (selectedReason === "Otro") {
    selectedReason = inputOtros.value;
  }
  return selectedReason;
}
