"use strict";

// Para filtrar
let inputFiltro = document.getElementById("txtNombreActivo");
inputFiltro.addEventListener("keyup", ImprimirTraslados);

let listaTraslados = [];

GetListaTraslados();

async function GetListaTraslados() {
  let result = await ProcessGET("ListarTraslados", null);
  if (result != null && result.resultado == true) {
    listaTraslados = result.ListaTrasladosDB;
    console.log(listaTraslados);
    ImprimirTraslados();
  } else {
    PrintError(result.msj);
    return;
  }
}

function ImprimirTraslados() {
  let tbody = document.getElementById("table-body");
  let filtro = inputFiltro.value;
  tbody.innerHTML = "";

  for (let i = 0; i < listaTraslados.length; i++) {
    if (
      listaTraslados[i].ID_Traslado.toLowerCase().includes(filtro) ||
      listaTraslados[i].ActivoAfectado.toLowerCase().includes(filtro) ||
      listaTraslados[i].Solicitante.toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaID_Solicitud = fila.insertCell();
      let celdaID_Afectado = fila.insertCell();
      let celdaRazon = fila.insertCell();
      let celdaImagenes = fila.insertCell();
      let celdaFecha = fila.insertCell();
      let celdaSolicitante = fila.insertCell();
      let celdaEstado = fila.insertCell();
      let celdaAcciones = fila.insertCell();

      celdaID_Solicitud.innerHTML = listaTraslados[i].ID_Traslado;
      celdaID_Afectado.innerHTML = listaTraslados[i].ActivoAfectado;
      celdaRazon.innerHTML = listaTraslados[i].Razon;
      celdaImagenes.innerHTML = listaTraslados[i].Imagenes;
      celdaFecha.innerHTML = listaTraslados[i].Fecha;
      celdaSolicitante.innerHTML = listaTraslados[i].Solicitante;
      celdaEstado.innerHTML = getEstadoTraslado(listaTraslados[i].Estado);

      // @@@ arreglar las funciones de los botones
      let btnAprobar = document.createElement("button");
      btnAprobar.type = "button";
      btnAprobar.innerText = "Aprobar";
      btnAprobar.title = "Aprobar";
      btnAprobar.classList.add("btnsTabla");
      btnAprobar.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea aprobar el traslado de " + listaTraslados[i].ID_activo,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let data = {
            _id: listaTraslados[i]._id,
            Estado: 1,
          };
          let result = await ProcessPUT("ActualizarEstadoTraslado", data);
          if (result.resultado == true) {
            PrintSuccess(result.msj);
            location.href = "estadoTrasladoAdmin.html";
          } else {
            PrintError(result.msj);
          }
          await GetListaTraslados();
        }
      };

      let btnRechazar = document.createElement("button");
      btnRechazar.type = "button";
      btnRechazar.innerText = "Rechazar";
      btnRechazar.title = "Rechazar";
      btnRechazar.classList.add("btnsTabla");
      btnRechazar.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: "Desea rechazar el traslado de " + listaTraslados[i].ID_activo,
          icon: "warning",
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          showDenyButton: true,
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let data = {
            _id: listaTraslados[i]._id,
            Estado: 2,
          };
          let result = await ProcessPUT("ActualizarEstadoTraslado", data);
          if (result.resultado == true) {
            PrintSuccess(result.msj);
            location.href = "estadoTrasladoAdmin.html";
          } else {
            PrintError(result.msj);
          }
          await GetListaTraslados();
        }
      };

      let divBtns = document.createElement("div");
      if (listaTraslados[i].Estado == 0) {
        divBtns.appendChild(btnAprobar);
        // divBtns.appendChild(btnRechazar);
      }
      celdaAcciones.appendChild(divBtns);
    }
  }
}

function getEstadoTraslado(estado) {
  if (estado == 0) {
    return "Pendiente";
  } else if (estado == 1) {
    return "Aceptado";
  } else if (estado == 2) {
    return "Rechazado";
  }
}
