"use strict";

let txtEmail = document.getElementById("txtEmail");

async function Enviar() {
  let email = txtEmail.value;

  if (!ValidateEmail(txtEmail)) {
    return;
  }

  let params = {
    Email: email,
  };

  let result = await ProcessGET("BuscarPersonaEmail", params);

  if (result == null || result.personaDB == null) {
    PrintError("El email no se encuentra actualmente registrado.");
  } else {
    let data = {
      _id: result.personaDB._id,
      Nombre: result.personaDB.Nombre,
      Email: email,
      Password: GenerateTempPass(),
    };

    let result2 = await ProcessPUT("RecuperarPass", data);

    if (!result2) {
      PrintError("Ocurrio un error inesperado.");
    } else if (result2.resultado == false) {
      PrintError(result2.msj);
    } else {
      PrintSuccess("Se ha enviado la nueva contraseña a su correo.");
    }
  }
}
