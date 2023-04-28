"use strict";

// Para filtrar
let inputFiltro = document.getElementById("txtBuscar");
inputFiltro.addEventListener("keyup", ImprimirTraslados);

let listaTraslados = [];

GetListaTraslados();

async function GetListaTraslados() {
  let result = await ProcessGET("ListarTraslados", null);
  if (result != null && result.resultado == true) {
    listaTraslados = result.ListaTrasladosDB;
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
      if (listaTraslados[i].Estado != 0) {
        let fila = tbody.insertRow();
        let celdaID_Solicitud = fila.insertCell();
        let celdaID_Afectado = fila.insertCell();
        let celdaRazon = fila.insertCell();
        let celdaImagenes = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaSolicitante = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaID_Solicitud.innerHTML = listaTraslados[i].ID_Traslado;
        celdaID_Afectado.innerHTML = listaTraslados[i].ActivoAfectado;
        celdaRazon.innerHTML = listaTraslados[i].Razon;
        celdaFecha.innerHTML = listaTraslados[i].FechaCreacion;
        celdaSolicitante.innerHTML = listaTraslados[i].Solicitante;
        celdaEstado.innerHTML = getEstadoTraslado(listaTraslados[i].Estado);

        //Crea botones para las imagenes
        let btnVerImagen1 = document.createElement("button");
        btnVerImagen1.type = "button";
        btnVerImagen1.innerText = "1";
        btnVerImagen1.title = "Ver Imagenes";
        btnVerImagen1.classList.add("btnsTabla", "buttons");
        btnVerImagen1.onclick = async function () {
          let src = listaTraslados[i].Imagen1;
          window.open(src);
        };

        let btnVerImagen2 = document.createElement("button");
        btnVerImagen2.type = "button";
        btnVerImagen2.innerText = "2";
        btnVerImagen2.title = "Ver Imagenes";
        btnVerImagen2.classList.add("btnsTabla", "buttons");
        btnVerImagen2.onclick = async function () {
          let src = listaTraslados[i].Imagen2;
          window.open(src);
        };

        let divBtns = document.createElement("div");
        divBtns.appendChild(btnVerImagen1);
        divBtns.appendChild(btnVerImagen2);
        celdaImagenes.appendChild(divBtns);

        // @@@ arreglar las funciones de los botones
        let btnAprobar = document.createElement("button");
        btnAprobar.type = "button";
        btnAprobar.innerText = "Aprobar";
        btnAprobar.title = "Aprobar";
        btnAprobar.classList.add("btnsTabla", "buttons");
        btnAprobar.onclick = async function () {
          let confirmacion = false;
          await Swal.fire({
            title:
              "Desea aprobar el traslado de " + listaTraslados[i].ID_activo,
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
        btnRechazar.classList.add("btnsTabla", "buttons");
        btnRechazar.onclick = async function () {
          let confirmacion = false;
          await Swal.fire({
            title:
              "Desea rechazar el traslado de " + listaTraslados[i].ID_activo,
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
      }
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
