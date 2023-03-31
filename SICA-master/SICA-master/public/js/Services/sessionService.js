"use strict";

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
