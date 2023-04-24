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

      // let btnAceptar = document.createElement("button");
      // btnAceptar.innerHTML = "Aceptar";
      // btnAceptar.classList.add("btn");
      // btnAceptar.classList.add("btn-success");
      // btnAceptar.classList.add("btn-sm");
      // btnAceptar.addEventListener("click", async () => {
      //   let id = listaTraslados[i].ID_Traslado;
      //   let estado = 1;
      //   let data = {
      //     id,
      //     estado,
      //   };
      //   await ProcessPOST("ActualizarEstadoTraslado", data);
      // });
      //
      // let btnRechazar = document.createElement("button");
      // btnRechazar.innerHTML = "Rechazar";
      // btnRechazar.classList.add("btn");
      // btnRechazar.classList.add("btn-success");
      // btnRechazar.classList.add("btn-sm");
      // btnRechazar.addEventListener("click", async () => {
      //   let id = listaTraslados[i].ID_Traslado;
      //   let estado = 2;
      //   let data = {
      //     id,
      //     estado,
      //   };
      //   await ProcessPOST("ActualizarEstadoTraslado", data);
      // });
      //
      // celdaAcciones.appendChild(btnAceptar);
      // celdaAcciones.appendChild(btnRechazar);
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
