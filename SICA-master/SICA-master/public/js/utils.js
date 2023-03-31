"use strict";

function PrintError(msj) {
  Swal.fire({
    title: "Error!",
    text: msj,
    icon: "error",
    confirmButtonText: "Return",
  });
}

function PrintSuccess(msj) {
  Swal.fire({
    title: "Excelente!",
    text: msj,
    icon: "success",
    confirmButtonText: "Ok",
  });
}

/**
 * Validacion de correo electronico con expresiones regulares
 * El correo no debe contener espacios
 *
 * @param email
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @see https://regex101.com/
 */
function ValidateEmail(pEmail) {
  const email = pEmail.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    PrintError("Ingrese un correo electronico valido");
    return false;
  } else {
    return true;
  }
}

/**
 * Valida las contraseñas
 * Condiciones de contraseña:
 * - Minimo 8 caracteres
 * - Al menos una minuscula
 * - Al menos una mayuscula,
 * - Al menos un numero
 * - La contraseña de confirmacion debe ser igual a la contraseña inicial
 */
function ValidatePasswords(pPass) {
  const pass = pPass.value;

  if (!pass || pass == "") {
    PrintError("Contraseña es requerida");
    return false;
  }

  if (pass.length < 8) {
    PrintError("La contraseña es menor a 8 caracteres");
    return false;
  }

  if (!/[a-z]/.test(pass)) {
    PrintError("La contraseña debe tener al menos una minuscula");
    return false;
  }

  if (!/[A-Z]/.test(pass)) {
    PrintError("La contraseña debe tener al menos una mayuscula");
    return false;
  }

  if (!/[\d]/.test(pass)) {
    PrintError("La contraseña debe contener al menos un numero");
    return false;
  }

  // if (passConf != pass) {
  //   PrintError("Las contraseñas no coinciden");
  //   return false;
  // }

  return true;
}

let proveLogo = document.getElementById("prove-logo");
let profile = document.getElementById("user-icon");

proveLogo.addEventListener("click", RedirectHome);
profile.addEventListener("click", RedirectEditProfile);

function RedirectHome() {
  if (location.href.includes("login.html")) {
    return;
  }

  location.href = "landpageAdmin.html";
}

function RedirectEditProfile() {
  if (profile == null) {
    return;
  }

  location.href = "editProfile.html";
}

function EnableButtons() {
  const disabledButtons = document.querySelectorAll("button.buttons.disabled");

  for (let i = 0; i < disabledButtons.length; i++) {
    const button = disabledButtons[i];
    button.classList.remove("disabled");
    button.classList.add("buttons");
  }
}
