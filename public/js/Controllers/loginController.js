"use strict";

let txtUser = document.getElementById("txtUser");
let txtPass = document.getElementById("txtPass");
let forgotPass = document.getElementById("forgot-link");

function IniciarSesion() {
  let user = txtUser.value;
  let pass = txtPass.value;

  if (ValidateData(user, pass) == false) {
    return;
  }

  let result = AuthenticateUser(user, pass);

  if (result != null) {
    RedirectUser(result);
  } else {
    PrintError("Usuario y/o contraseña incorrectos");
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

  if (rol == "Admin") {
    location.href = "landpageAdmin.html";
  }
}
