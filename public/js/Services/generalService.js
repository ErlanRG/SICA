"use strict";

async function ProcessGET(pRouterName, pParams) {
  let result = null;
  await axios({
    method: "get",
    url: apiUrl + pRouterName,
    reponseType: "json",
    params: pParams,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}

async function ProcessPOST(pRouterName, pData) {
  let result = await ProcessAction("post", pRouterName, pData);
  if (pRouterName == "RegistrarPersona") {
    if (result.resultado == false) {
      switch (result.code) {
        case 11000:
          result.msj =
            "No se pudo actualizar la persona, ya existe una persona con esa identificacion ";
          console.log("No se pudo registrar codigo 11000");
          break;
        default:
          break;
      }
    }
  }
  return result;
}

async function ProcessAction(pMethod, pRouterName, pData) {
  let result = null;
  await axios({
    method: pMethod,
    url: apiUrl + pRouterName,
    responseType: "json",
    data: pData,
  })
    .then(async (res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}

function SetActiveSession(pUserData) {
  let jsonStringify = JSON.stringify(pUserData);
  localStorage.setItem("ActiveSessionData", jsonStringify);
}

function ClearActiveSession() {
  localStorage.removeItem("ActiveSessionData");
}

function GetActiveSession() {
  let activeSessionData = null;
  let localStorageData = localStorage.getItem("ActiveSessionData");
  if (
    localStorageData != null &&
    localStorageData != undefined &&
    localStorageData != ""
  ) {
    activeSessionData = JSON.parse(localStorageData);
  }
  return activeSessionData;
}
