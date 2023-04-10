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
