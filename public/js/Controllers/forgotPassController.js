"use strict";

let txtEmail = document.getElementById("txtEmail");

function Enviar() {
  let email = txtEmail.value;
  if (ValidateEmail(txtEmail)) {
    let usuarioEmail = userTest.find((usuario) => usuario.Email === email);

    if (usuarioEmail) {
      PrintSuccess("Email enviado a " + email);
    } else {
      PrintError("El email no esta registrado");
    }
  }
}
