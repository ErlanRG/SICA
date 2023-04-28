"use strict";
let sedes = [];
let isAdd = true;
let sedeId,
  _ID = "";

let inputNombreSede = document.getElementById("txtNombreSede");
let inputDescripcionSede = document.getElementById("txtDescripcionSede");
let inputFechaSede = new Date();
let inputUbicacionSede = document.getElementById("txtUbicacionSede");

inputFechaSede.max = new Date().toISOString().split("T")[0];

let editBtn = document.getElementById("edit");
let addBtn = document.getElementById("add");
let cancelBtn = document.getElementById("cancel");

// Popup
let lblTitlePopup = document.getElementById("title_popup");
let btnActionPopup = document.getElementById("btnAction_popup");

// Para habilitar botones
editBtn.addEventListener("click", EnableButtons);
cancelBtn.addEventListener("click", DisableButtons);
addBtn.addEventListener("click", EnableAddCampus);

let inputFiltro = document.getElementById("filter");
inputFiltro.addEventListener("keyup", ImprimirDatos);

// Once Document Load
getListaSedes();

function ValidarDatos(pNombre, pDescripcion, pUbicacion) {
  if (!pNombre || pNombre == "") {
    PrintError("Por favor indicar el nombre de la sede");
    return false;
  }
  if (!pDescripcion || pDescripcion == "") {
    PrintError("Por favor indicar la descripción de la sede");
    return false;
  }
  if (!pUbicacion || pUbicacion == "") {
    PrintError("Por favor indicar la ubicación de la sede");
    return false;
  }
}

async function RegistrarSede() {
  let NombreSede = inputNombreSede.value;
  let DescripcionSede = inputDescripcionSede.value;
  let FechaCreacion = inputFechaSede.value;
  let UbicacionSede = inputUbicacionSede.value;

  if (ValidarDatos(NombreSede, DescripcionSede, UbicacionSede) == false) {
    return;
  }

  let result = null;
  let data = {
    Nombre: NombreSede,
    Descripcion: DescripcionSede,
    Ubicacion: UbicacionSede,
    FechaCreacion: setDate(),
  };

  result = await ProcessPOST("RegistrarSede", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado");
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    await Swal.fire({
      title: "Sede registrada correctamente",
      icon: "success",
      confirmButtonText: "Continuar",
    }).then((res) => {
      if (res.isConfirmed == true) {
        location.reload();
      }
    });
  }
}

async function ImprimirDatos() {
  let listaSedes = sedes;
  let tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  for (let i = 0; i < listaSedes.length; i++) {
    let row = tbody.insertRow();
    let celdaIDSede = row.insertCell();
    let celdaNombre = row.insertCell();
    let celdaDescripcion = row.insertCell();
    let celdaFecha = row.insertCell();
    let celdaUbicacion = row.insertCell();
    let celdaAcciones = row.insertCell();

    celdaIDSede.innerHTML = listaSedes[i].ID_sede;
    celdaNombre.innerHTML = listaSedes[i].Nombre;
    celdaDescripcion.innerHTML = listaSedes[i].Descripcion;
    celdaUbicacion.innerHTML = listaSedes[i].Ubicacion;

    let dob = new Date(listaSedes[i].FechaCreacion.replace("Z", ""));
    celdaFecha.innerHTML =
      dob.getDate() + "/" + (dob.getMonth() + 1) + "/" + dob.getFullYear();

    let btnEdit = document.createElement("button");
    btnEdit.type = "button";
    btnEdit.innerText = "✎";
    btnEdit.title = "Editar";
    btnEdit.classList.add("btnsTabla");
    btnEdit.onclick = async function () {
      sedeId = listaSedes[i].ID_sede;
      cargarInformation(listaSedes[i]._id);
    };

    let btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.innerText = "🗑️";
    btnDelete.title = "Elimnar";
    btnDelete.classList.add("btnsTabla");
    btnDelete.onclick = async function () {
      let confirmacion = false;
      await Swal.fire({
        title: "Desea eliminar la sede de " + listaSedes[i].Nombre,
        icon: "warning",
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
        showDenyButton: true,
      }).then((res) => {
        confirmacion = res.isConfirmed;
      });

      if (confirmacion == true) {
        let data = {
          //el ID de Sede?
          ID_sede: listaSedes[i].ID_sede,
        };
        let result = await ProcessDELETE("EliminarSede", data);
        if (result.resultado == true) {
          PrintSuccess(result.msj);
        } else {
          PrintError(result.msj);
        }
        await getListaSedes();
      }
    };

    let divBtns = document.createElement("div");
    divBtns.appendChild(btnEdit);
    divBtns.appendChild(btnDelete);
    celdaAcciones.appendChild(divBtns);
  }
}

async function getListaSedes() {
  let result = await ProcessGET("/ListarSedes", null);

  if (result == null) {
    PrintError(result.msj);
  } else if ((result.resultado = false)) {
    PrintError(result.msj);
  } else {
    sedes = result.listaSedes;
    ImprimirDatos();
    return;
  }
}

async function editarSede() {
  //*los datos que se desean modificar*/
  let sedeData = {
    _id: _ID,
    ID_sede: sedeId,
    Nombre: inputNombreSede.value,
    Descripcion: inputDescripcionSede.value,
    FechaCreacion: inputFechaSede.value,
    Ubicacion: inputUbicacionSede.value,
  };
  let result = await ProcessPUT("/ModificarSede", sedeData);
  if (result == null) {
    PrintError(result.msj);
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    await Swal.fire({
      title: "Sede modificada correctamente",
      icon: "success",
      confirmButtonText: "OK",
    }).then((res) => {
      if (res.isConfirmed == true) {
        location.href = "sede.html";
      }
    });
  }
}

async function cargarInformation(sedeId) {
  isAdd = false;
  _ID = sedeId;
  EnableAddCampus();
  let sede = sedes.find((sede) => sede._id == _ID);
  inputNombreSede.value = sede.Nombre;
  inputDescripcionSede.value = sede.Descripcion;
  inputUbicacionSede.value = sede.Ubicacion;
  inputFechaSede.value = sede.FechaCreacion.substring(0, 10);
}

function setDate() {
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);
  return dateString;
}

function EnableButtons() {
  editBtn.style.display = "none";
  addBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

function DisableButtons() {
  editBtn.style.display = "inline";
  addBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

function EnableAddCampus() {
  if (isAdd) {
    lblTitlePopup.innerHTML = "Agregar Sede";
    btnActionPopup.innerHTML = "Agregar";
    btnActionPopup.addEventListener("click", RegistrarSede);
  } else {
    lblTitlePopup.innerHTML = "Editar Sede";
    btnActionPopup.innerHTML = "Editar";
    btnActionPopup.addEventListener("click", editarSede);
  }
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
