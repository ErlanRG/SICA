"use strict";

let inputFiltro = document.getElementById("txtBuscar");
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
      listaActivos[i].Unidad.toLowerCase().includes(filtro) ||
      listaActivos[i].Ubicacion.toLowerCase().includes(filtro) ||
      listaActivos[i].CodigoUbic.toLowerCase().includes(filtro) ||
      listaActivos[i].Descripcion.toLowerCase().includes(filtro) ||
      listaActivos[i].Usuario.toLowerCase().includes(filtro) ||
      listaActivos[i].FechaCreacion.toLowerCase().includes(filtro) ||
      ObtenerEstado(listaActivos[i].Estado).toLowerCase().includes(filtro)
    ) {
      if (listaActivos[i].Estado != 0) {
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

        celdaID.innerHTML = listaActivos[i].ID_activo;
        celdaNombre.innerHTML = listaActivos[i].Nombre;
        celdaUnidad.innerHTML = listaActivos[i].Unidad;
        celdaUbic.innerHTML = listaActivos[i].Ubicacion;
        celdaCodigoUbic.innerHTML = listaActivos[i].CodigoUbic;
        celdaDesc.innerHTML = listaActivos[i].Descripcion;
        celdaUsuario.innerHTML = listaActivos[i].Usuario;
        celdaFecha.innerHTML = listaActivos[i].FechaCreacion;
        celdaEstado.innerHTML = ObtenerEstado(listaActivos[i].Estado);
      }
    }
  }
}
