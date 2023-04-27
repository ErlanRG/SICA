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
        if(listaGeneral[i].Nombre.toLowerCase().includes(filtro) ||
            listaGeneral[i].Apellido1.toLowerCase().includes(filtro)
        ){
            let fila = tbody.insertRow();
            let celdaFecha = fila.insertCell();
            let celdaUsuario = fila.insertCell();
            let celdaSede = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdamovimiento = fila.insertCell();
            let celdaDescripcion = fila.insertCell();

            celdaFecha.innerHTML = ObtenerFecha(
                listaGeneral[i].fecha
            );
            celdaFecha.innerHTML = listaGeneral[i].fecha;
            celdaUsuario.innerHTML =
            listaGeneral[i].Nombre + 
            " " + 
            listaGeneral[i].Apellido1 + 
            " " + 
            listaGeneral[i].Apellido2;
            celdaSede.innerHTML = listaGeneral[i].Sede;
            celdaEstado.innerHTML = listaGeneral[i].Estado;
            celdamovimiento.innerHTML = listaGeneral[i].Movimiento;
            celdaDescripcion.innerHTML = listaGeneral[i].Descripcion;
        }
    listaGeneral.push(resultActivos);
    listaGeneral.push(resultPersona);
    listaGeneral.push(resultSede);
    listaGeneral.push(resultTraslado);
}
}