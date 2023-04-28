"use strict";

// Para filtrar
let inputFiltro = document.getElementById("txtBuscarActivo");
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
    let fila = tbody.insertRow();
    let celdaMovimientoID = fila.insertCell();
    let celdaSolicitante = fila.insertCell();
    let celdaFecha = fila.insertCell();
    let celdaUbicAnt = fila.insertCell();
    let celdaUbicNuev = fila.insertCell();
    let celdaDesc = fila.insertCell();
    let celdaImg = fila.insertCell();

    celdaMovimientoID.innerHTML = listaTraslados[i].ID_Traslado;
    celdaSolicitante.innerHTML = listaTraslados[i].Solicitante;
    celdaFecha.innerHTML = listaTraslados[i].FechaCreacion;
    celdaUbicAnt.innerHTML = listaTraslados[i].UbicacionAnterior;
    celdaUbicNuev.innerHTML = listaTraslados[i].UbicacionNueva;
    celdaDesc.innerHTML = listaTraslados[i].Razon;

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
    celdaImg.appendChild(divBtns);
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
