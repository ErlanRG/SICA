"use strict";

let inputIDSede = document.getElementById("txtIDSede")
let inputNombreSede = document.getElementById("txtNombreSede")
let inputDescripcionSede = document.getElementById("txtDescripcionSede")
let inputFechaSede = document.getElementById("txtDate")
let inputUbicacionSede = document.getElementById("txtUbicacionSede")


let editBtn = document.getElementById("edit")
let addBtn = document.getElementById("add")
let cancelBtn = document.getElementById("cancel")

// Para habilitar botones
editBtn.addEventListener("click", EnableButtons)
cancelBtn.addEventListener("click", DisableButtons)
addBtn.addEventListener("click", EnableAddUser)

let inputFiltro = document.getElementById("filter")
inputFiltro.addEventListener("keyup", ImprimirDatos)


loadInfo()
async function loadInfo(sedeId) {
    let userParams = {
        inputIDSede: sedeId
    }
    let result = await ProcessGET('/BuscarSedeID', userParams)
    if ( result == null) {
        Swal.fire({
            title: 'Error!',
            text: ":)",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {
        /*Se carga la info automáticamente */
        inputIDSede.value = result.sedeDB.ID_sede
        inputNombreSede.value = result.sedeDB.Nombre
        inputDescripcionSede.value = result.sedeDB.Descripcion
        inputFechaSede.value = result.sedeDB.FechaCreacion.replace('T00:00:00.000Z', '')
        inputUbicacionSede.value = result.sedeDB.Ubicacion
    }
}

async function editSede() {
    //*los datos que se desean modificar*/
    let sedeData = {
        ID_sede : inputIDSede.value,
        Nombre: inputNombreSede.value,
        Descripcion: inputDescripcionSede.value,
        FechaCreacion: inputFechaSede.value,
        Ubicacion: inputUbicacionSede.value,
        
    }
    // Se debe crear otro ProcessPut?
    let result = await ProcessPUT('/ModificarSede', sedeData)
    if ( result == null) {
        Swal.fire({
            title: 'Error!',
            text: "Error al modificar la sede, vuelva a intentarlo",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {

        await Swal.fire ({
            title: 'Sede modificado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((res) => {
            if (res.isConfirmed == true) {
                location.href = 'sede.html'
            }
        });
    }

}
