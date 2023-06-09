"use strict";

let txtIDType = document.getElementById("txtIDType");
let txtIDNumber = document.getElementById("txtID");
let txtAddName = document.getElementById("txtAddName");
let txtLastname1 = document.getElementById("txtLastname1");
let txtLastname2 = document.getElementById("txtLastname2");
let txtBirthdate = document.getElementById("txtBirthdate");
let txtEmail = document.getElementById("txtEmail");
let rolSelect = document.getElementById("rol-dropdown");
let inputProfileImg = document.getElementById("inputImgProfile");

let editBtn = document.getElementById("edit");
let addBtn = document.getElementById("add");
let cancelBtn = document.getElementById("cancel");

// Para habilitar botones
editBtn.addEventListener("click", EnableButtons);
cancelBtn.addEventListener("click", DisableButtons);
addBtn.addEventListener("click", EnableAddUser);

// Para filtrar
let inputFiltro = document.getElementById("filter");
inputFiltro.addEventListener("keyup", ImprimirDatos);

let listaPersonas = [];

GetListaPersonas();

async function GetListaPersonas() {
  let result = await ProcessGET("ListarPersonas", null);
  if (result != null && result.resultado == true) {
    listaPersonas = result.ListaPersonasDB;
    ImprimirDatos();
  } else {
    PrintError(result.msj);
    return;
  }
}

async function ImprimirDatos() {
  let tbody = document.getElementById("table-body");
  let filtro = inputFiltro.value;
  tbody.innerHTML = "";

  for (let i = 0; i < listaPersonas.length; i++) {
    if (
      listaPersonas[i].Identificacion.toLowerCase().includes(filtro) ||
      listaPersonas[i].Nombre.toLowerCase().includes(filtro) ||
      listaPersonas[i].Apellido1.toLowerCase().includes(filtro) ||
      listaPersonas[i].Apellido2.toLowerCase().includes(filtro) ||
      listaPersonas[i].Nacimiento.toLowerCase().includes(filtro) ||
      PrintRol(listaPersonas[i].Rol).toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaTipoIdentificacion = fila.insertCell();
      let celdaIdentificacion = fila.insertCell();
      let celdaNombre = fila.insertCell();
      let celdaEmail = fila.insertCell();
      let celdaNacimiento = fila.insertCell();
      let celdaEstado = fila.insertCell();
      let celdaRol = fila.insertCell();
      let celdaAcciones = fila.insertCell();

      celdaTipoIdentificacion.innerHTML = ObtenerTipoIdentificacion(
        listaPersonas[i].TipoIdentificacion
      );
      celdaIdentificacion.innerHTML = listaPersonas[i].Identificacion;
      celdaNombre.innerHTML =
        listaPersonas[i].Nombre +
        " " +
        listaPersonas[i].Apellido1 +
        " " +
        listaPersonas[i].Apellido2;
      celdaEmail.innerHTML = listaPersonas[i].Email;
      celdaEstado.innerHTML = ObtenerEstado(listaPersonas[i].Estado);
      celdaRol.innerHTML = ObtenerRol(listaPersonas[i].Rol);

      let fechaNac = new Date(listaPersonas[i].Nacimiento.replace("Z", ""));
      celdaNacimiento.innerHTML =
        fechaNac.getDate() +
        "/" +
        (fechaNac.getMonth() + 1) +
        "/" +
        fechaNac.getFullYear();

      let btnEdit = document.createElement("button");
      btnEdit.type = "button";
      btnEdit.innerText = "✎";
      btnEdit.title = "Editar";
      btnEdit.classList.add("btnsTabla", "buttons");
      btnEdit.onclick = function () {
        location.href =
          "editProfile.html?_id=" +
          listaPersonas[i]._id +
          "&nombre=" +
          listaPersonas[i].Nombre +
          "&Rol=" +
          listaPersonas[i].Rol;
      };

      let btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.innerText = "🗑️";
      btnDelete.title = "Elimnar";
      btnDelete.classList.add("btnsTabla", "buttons");
      btnDelete.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea eliminar el registro de " + listaPersonas[i].Nombre,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let data = {
            _id: listaPersonas[i]._id,
          };
          let result = await ProcessDELETE("EliminarPersona", data);
          if (result.resultado == true) {
            PrintSuccess(result.msj);
          } else {
            PrintError(result.msj);
          }
          await GetListaPersonas();
        }
      };

      let btnInactivar = document.createElement("button");
      btnInactivar.type = "button";
      btnInactivar.innerText = "Off";
      btnInactivar.title = "Inactivar";
      btnInactivar.classList.add("btnsTabla", "buttons");
      btnInactivar.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea inactivar el registro de " + listaPersonas[i].Nombre,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let data = {
            _id: listaPersonas[i]._id,
          };
          let result = await ProcessPOST("InactivarPersona", data);
          if (result.resultado == true) {
            PrintSuccess(result.msj);
          } else {
            PrintError(result.msj);
          }
          await GetListaPersonas();
        }
      };

      let divBtns = document.createElement("div");
      divBtns.appendChild(btnEdit);
      divBtns.appendChild(btnDelete);
      divBtns.appendChild(btnInactivar);
      celdaAcciones.appendChild(divBtns);
    }
  }
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

function EnableAddUser() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
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

async function AddUser() {
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
  ) {
    return;
  }

  let result = null;
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
    FotoPerfil: inputProfileImg.getAttribute("src"),
  };

  result = await ProcessPOST("RegistrarPersona", data);

  if (!result) {
    PrintError("Ocurrio un error inesperado");
  } else if (result.resultado == false) {
    PrintError(result.msj);
  } else {
    PrintSuccess("Usuario registrado con éxito.").then((res) => {
      closePopup();
      location.href = "users.html";
    });
  }
}
