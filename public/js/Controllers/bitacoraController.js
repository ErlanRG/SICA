"use strict";

let txtNombreEmpleado = document.getElementById("nombre-empleado");
let txtLocalizacion = document.getElementById("localizacion");
let IDActivo = document.getElementById("id-activo");
let fechaTraslado = document.getElementById("fecha-traslado");
let txtResponsable = document.getElementById("responsable");
let txtExtras = document.getElementById("extras");
let radios = document.getElementsByName("radioBtn");
let txtOrigen = document.getElementById("origen");
var modal = document.getElementById("miModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    CerrarFormulario();
}

window.onclick = function (event) {
    if (event.target == modal) {
        CerrarFormulario();
    }
}
function AbrirFormulario() {
    var labels = document.getElementsByTagName("label");
    console.log(labels);
    modal.style.display = "block";
}
function CerrarFormulario() {
    modal.style.display = "none";
}


function Validar() {
  let nombre = txtNombreEmpleado.value;
  let localizacion = txtLocalizacion.value;
  let activo = IDActivo.value;
  let fecha = fechaTraslado.value;
  let responsable = txtResponsable.value;
  let extras = txtExtras.value;
  let origen = txtOrigen.value;

  let hoy = new Date();

  if (!nombre || nombre == "") {
    PrintError("Debe introducir nombre");
    return;
  }

  if (!localizacion || localizacion == "") {
    PrintError("Debe introducir localizacion");
    return;
  }

  if (!activo || activo == "") {
    PrintError("Debe introducir activo");
    return;
  }

  if (!fecha) {
    PrintError("Debe introducir fecha");
    return;
  }

  if (fecha < hoy) {
    PrintError("Fecha no puede ser menor");
    return;
  }

  if (!responsable || responsable == "") {
    PrintError("Debe introducir responsable");
    return;
  }

  if (!extras || extras == "") {
    PrintError("Debe introducir extras");
    return;
  }

  if (ValidarRadioBtns() == false) {
    return;
  }

  if (!origen || origen == "") {
    PrintError("Debe introducir origen");
    return;
  }

  PrintSuccess("Datos validados");
}
//crear modelo y esquema de las bitacora, hacer crud de la bitacora crear, enlistar y buscar
function ValidarRadioBtns() {
  let seleccion = null;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      seleccion = radios[i].value;
      break;
    }
  }

  if (!seleccion) {
    PrintError("Seleccione si quiere donar o almacenar");
    return false;
  }

  return true;
}
