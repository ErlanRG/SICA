"use strict";

let inputFiltro = document.getElementById("txtBuscarActivo");
inputFiltro.addEventListener("keyup", ImprimirDatos);

let listaActivos = [];

GetListaActivos();

async function GetListaActivos() {
  let result = await ProcessGET("ListarActivos", null);
  if (result != null && result.resultado == true) {
    listaActivos = result.ListaActivosDB;
    ImprimirDatos();
  } else {
    PrintError(result.msj);
    return;
  }
}

function ImprimirDatos() {
  let tbody = document.getElementById("table-body");
  let filtro = inputFiltro.value;
  tbody.innerHTML = "";

  for (let i = 0; i < listaActivos.length; i++) {
    if (
      listaActivos[i].ID_activo.toLowerCase().includes(filtro) ||
      listaActivos[i].Nombre.toLowerCase().includes(filtro) ||
      listaActivos[i].Ubicacion.toLowerCase().includes(filtro) ||
      listaActivos[i].Unidad.toLowerCase().includes(filtro) ||
      ObtenerEstado(listaActivos[i].Estado).toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaID = fila.insertCell();
      let celdaNombre = fila.insertCell();
      let celdaUnidad = fila.insertCell();
      let celdaUbic = fila.insertCell();
      let celdaCodigoUbic = fila.insertCell();
      let celdaDesc = fila.insertCell();
      let celdaUsuario = fila.insertCell();
      let celdaFecha = fila.insertCell();
      let celdaEstado = fila.insertCell();
      let celdaAcciones = fila.insertCell();

      celdaID.innerHTML = listaActivos[i].ID_activo;
      celdaNombre.innerHTML = listaActivos[i].Nombre;
      celdaUnidad.innerHTML = listaActivos[i].Unidad;
      celdaUbic.innerHTML = listaActivos[i].Ubicacion;
      celdaCodigoUbic.innerHTML = listaActivos[i].CodigoUbic;
      celdaDesc.innerHTML = listaActivos[i].Descripcion;
      celdaUsuario.innerHTML = listaActivos[i].Usuario;
      celdaFecha.innerHTML = listaActivos[i].FechaCreacion;
      celdaEstado.innerHTML = ObtenerEstado(listaActivos[i].Estado);

      let btnAprobar = document.createElement("button");
      btnAprobar.type = "button";
      btnAprobar.innerText = "Aprobar";
      btnAprobar.title = "Aprobar";
      btnAprobar.classList.add("btnsTabla", "buttons");
      btnAprobar.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea aprobar el registro de " + listaActivos[i].ID_activo,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let data = {
            _id: listaActivos[i]._id,
          };
          let result = await ProcessPOST("ActivarActivo", data);
          if (result.resultado == true) {
            PrintSuccess(result.msj);
            location.href = "estadoDeRegistro.html";
          } else {
            PrintError(result.msj);
          }
          await GetListaActivos();
        }
      };

      let btnRechazar = document.createElement("button");
      btnRechazar.type = "button";
      btnRechazar.innerText = "Rechazar";
      btnRechazar.title = "Rechazar";
      btnRechazar.classList.add("btnsTabla", "buttons");
      btnRechazar.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea rechazar el registro de " + listaActivos[i].ID_activo,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          PrintSuccess("Activo rechazado");
        }
      };

      let divBtns = document.createElement("div");
      if (listaActivos[i].Estado == 0) {
        divBtns.appendChild(btnAprobar);
        divBtns.appendChild(btnRechazar);
      }
      celdaAcciones.appendChild(divBtns);
    }
  }
}
