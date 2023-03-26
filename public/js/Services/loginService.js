"use strict";

let userTest = [
  {
    Nombre: "Erlan",
    Apellido1: "Rangel",
    Apellido2: "Garro",
    User: "rangeler",
    Pass: "asdfzxcv",
    Rol: "Admin",
    Email: "erangelg@ucenfotec.ac.cr",
    Estatus: 1,
    SuperUser: true,
  },
];

function AuthenticateUser(pUser, pPass) {
  let result = null;

  for (let i = 0; i < userTest.length; i++) {
    const user = userTest[i];
    if (user.Pass == pPass && user.User == pUser) {
      result = user;
      break;
    }
  }

  if (result != null) {
    SetActiveSession(result);
  }

  return result;
}
