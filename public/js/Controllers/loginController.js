"use strict";

let txtUser = document.getElementById("txtUser");
let txtPass = document.getElementById("txtPass");
let forgotPass = document.getElementById("forgot-link");

// Iniciar sesion al presionar enter
txtPass.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    IniciarSesion();
  }
});

async function IniciarSesion() {
  let user = txtUser.value;
  let pass = txtPass.value;

  if (ValidateData(user, pass) == false) {
    return;
  }

  let params = {
    Email: user,
    Password: pass,
  };

  let result = await ProcessGET("AutenticarPersona", params);

  if (result != null && result.resultado == true && result.personaDB) {
    RedirectUser(result.personaDB);
    SetActiveSession(result.personaDB);
  } else {
    PrintError(result.msj);
  }
}

function ValidateData(pUser, pPass) {
  if (!pUser || pUser == undefined) {
    PrintError("Usuario no ingresado");
    return false;
  }

  if (!pPass || pPass == undefined) {
    PrintError("Debe ingresar una contraseña");
    return false;
  }

  return true;
}

function RedirectUser(pUser) {
  let rol = pUser.Rol;

  switch (rol) {
    case 1:
      location.href = "landpageAdmin.html";
      break;

    case 2:
    case 3:
      location.href = "landpageOthers.html";
      break;

    default:
      break;
  }
}
