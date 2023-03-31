"use strict";
IdentifyLoggedUser();

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
    rol.innerHTML = "ROL: " + result.Rol;
  }
}

function Logout() {
  ClearActiveSession();
  location.href = "login.html";
}
