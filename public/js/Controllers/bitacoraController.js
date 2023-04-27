'use strict';

let inputFiltrar = document.getElementById("txtFiltrar");
inputFiltrar.addEventListener("keyup", ImprimirTabla);

let listaGeneral = [];
GetListaGeneral();

async function GetListaGeneral(){
    let resultPersona = await ProcessGet("ListarPersona", data);
    let resultActivos = await ProcessGet("ListarActivos", data);
    let resultSede = await ProcessGet("ListarSedes", data);
    let resultTraslado = await ProcessGet("ListarTraslados", data);
    if(resultPersona != null && resultPersona.resultado == true){
        listaGeneral = resultPersona.ListaPersonaDB;
        ImprimirTabla();
    } else if(resultActivos != null && resultActivos.resultado == true){
        listaGeneral = resultActivos.ListaActivosDB;
        ImprimirTabla();
    } else if(resultSede != null && resultSede.resultado == true){
        listaGeneral = resultSede.ListaSedesDB;
        ImprimirTabla();
    } else if(resultTraslado != null && resultTraslado.resultado == true){
        listaGeneral = resultTraslado.ListaTrasladosDB;
        ImprimirTabla();
    }else{
        PrintError(resultPersona.msj
                ||resultActivos.msj
                ||resultSede.msj
                ||resultTraslado.msj);
        return;
    }
}
async function ImprimirTabla(){
    let tbody = document.getElementById("table-body");
    let filtro = inputFiltrar.value;
    tbody.innerHTML = "";

    for (let i = 0; i < listaGeneral.length; i++) {
    listaGeneral.push(resultActivos);
    listaGeneral.push(resultPersona);
    listaGeneral.push(resultSede);
    listaGeneral.push(resultTraslado);
}
}