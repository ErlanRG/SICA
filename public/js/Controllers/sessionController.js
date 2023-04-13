"use strict";
IdentifyLoggedUser();

function PrintRol() {
  let info = GetActiveSession();
  let rol = null;

  switch (info.Rol) {
    case 1:
      rol = "Admin";
      break;

    case 2:
      rol = "Proveeduría";
      break;

    case 3:
      rol = "Bodega";
      break;

    default:
      break;
  }

  return rol;
}

function IdentifyLoggedUser() {
  let result = GetActiveSession();

  if (result != null) {
    let message = document.getElementById("welcome-message");
    let rol = document.getElementById("rol");
    message.innerHTML =
      "<h1>Bievenid@ </h1>" +
      "<p>" +
      result.Nombre +
      " " +
      result.Apellido1 +
      "</p>";
    rol.innerHTML = "ROL: " + PrintRol();
  }
}

function Logout() {
  ClearActiveSession();
  location.href = "login.html";
}
