"use strict";

let tablaActivos= document.getElementById('table-body');

async function obtenerListaActivos(){
    let result = await ProcessGET('ListarActivos',null);
    if(result==null||result.ListaActivosDB==null||result==undefined){
        return;
    }
    return result.ListaActivosDB;
}

async function imprimirListaActivos(){
    let listaActivos = await obtenerListaActivos();

    tablaActivos.innerHTML='';
    
    for (let i = 0; i < listaActivos.length; i++){
        let fila = tablaActivos.insertRow();
        let celdaIdActivo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaCodigo = fila.insertCell();
        let celdaSede = fila.insertCell();

        celdaIdActivo.innerHTML=listaActivos[i].ID_activo;
        celdaNombre.innerHTML=listaActivos[i].Nombre;
        celdaDescripcion.innerHTML=listaActivos[i].Descripcion;
        celdaCodigo.innerHTML=listaActivos[i].CodigoUbic;
        celdaSede.innerHTML=listaActivos[i].Unidad;

    }

}
imprimirListaActivos();