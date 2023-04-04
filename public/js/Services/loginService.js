"use strict";

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
